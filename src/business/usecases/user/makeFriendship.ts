import { FriendGateway } from "../../gateways/friendGateway";
import { JWTAutenticationGateway } from "../../gateways/jwtAutenticationGateway";
import { ConflictError } from "../../errors/ConflictError";
import { ValidatorsGateway } from "../../gateways/validatorsGateway";

export class MakeFriendshipUC {
  constructor(
    private db: FriendGateway,
    private jwtAuth: JWTAutenticationGateway,
    private validators: ValidatorsGateway
  ) {}

  public async execute(
    input: MakeFriendshipUCInput
  ): Promise<MakeFriendshipUCOutput | undefined> {
    try {
      this.validators.validateMakeFriendshipInput(input);

      const userId = this.jwtAuth.verifyToken(input.token as string);

      const isFriend = await this.db.verifyFriendship(userId, input.friendId);

      if (isFriend) {
        throw new ConflictError("You are friends already");
      }

      await this.db.createFriendship(userId, input.friendId);

      await this.db.createFriendship(input.friendId, userId);

      return {
        message: "You are friends now",
      };
    } catch (err) {
      throw {
        code: err.statusCode || 400,
        message: err.message || "An error occurred while making friendship",
      };
    }
  }
}

export interface MakeFriendshipUCInput {
  token: string;
  friendId: string;
}

export interface MakeFriendshipUCOutput {
  message: string;
}
