import { FriendGateway } from "../../gateways/friendGateway";
import { JWTAutenticationGateway } from "../../gateways/jwtAutenticationGateway";
import { ConflictError } from "../../errors/ConflictError";
import { ValidatorsGateway } from "../../gateways/validatorsGateway";

export class UndoFriendshipUC {
  constructor(
    private db: FriendGateway,
    private jwtAuth: JWTAutenticationGateway,
    private validators: ValidatorsGateway
  ) {}

  public async execute(
    input: UndoFriendshipUCInput
  ): Promise<UndoFriendshipUCOutput | undefined> {
    try {
      this.validators.validateUndoFriendshipInput(input);

      const userId = this.jwtAuth.verifyToken(input.token as string);

      const areFriends = await this.db.verifyFriendship(userId, input.friendId);

      if (!areFriends) {
        throw new ConflictError(
          "To undo a friendship you must be a friend of the user"
        );
      }

      await this.db.undoFriendship(userId, input.friendId);

      await this.db.undoFriendship(input.friendId, userId);

      return {
        message: "Ended friendship",
      };
    } catch (err) {
      throw {
        code: err.statusCode || 400,
        message:
          err.message ||
          "An error occurred while trying to undo the friendship",
      };
    }
  }
}

export interface UndoFriendshipUCInput {
  token: string;
  friendId: string;
}

export interface UndoFriendshipUCOutput {
  message: string;
}
