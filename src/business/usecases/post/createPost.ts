import { v4 } from "uuid";
import { JWTAutenticationGateway } from "../../gateways/jwtAutenticationGateway";
import { PostGateway } from "../../gateways/postGateway";
import { Post } from "../../entities/post";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { ValidatorsGateway } from "../../gateways/validatorsGateway";

export class CreatePostUC {
  constructor(
    private db: PostGateway,
    private jwtAuth: JWTAutenticationGateway,
    private validators: ValidatorsGateway
  ) {}

  public async execute(
    input: CreatePostUCInput
  ): Promise<CreatePostUCOutput | undefined> {
    try {
      this.validators.validateCreatePostInput(input);

      const id = v4();

      const userId = this.jwtAuth.verifyToken(input.token);

      if (!userId) {
        throw new UnauthorizedError("Unauthorized");
      }

      const newPost = new Post(
        id,
        input.picture,
        input.description,
        new Date(),
        Post.mapStringsToPostType(input.type),
        userId
      );

      await this.db.createPost(newPost);

      return {
        message: "Post created successfully",
      };
    } catch (err) {
      throw {
        code: err.statusCode || 400,
        message:
          err.message || "An error occurred while trying to create a post",
      };
    }
  }
}

export interface CreatePostUCInput {
  token: string;
  picture: string;
  description: string;
  type: string;
}

export interface CreatePostUCOutput {
  message: string;
}
