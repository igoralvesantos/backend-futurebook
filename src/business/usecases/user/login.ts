import { UserGateway } from "../../gateways/userGateway";
import { JWTAutenticationGateway } from "../../gateways/jwtAutenticationGateway";
import { BcryptPasswordGateway } from "../../gateways/bcryptPassword";
import { NotFoundError } from "../../errors/NotFoundError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { ValidatorsGateway } from "../../gateways/validatorsGateway";

export class LoginUC {
  constructor(
    private db: UserGateway,
    private jwtAuth: JWTAutenticationGateway,
    private bcrypt: BcryptPasswordGateway,
    private validators: ValidatorsGateway
  ) {}

  public async execute(
    input: LoginUCInput
  ): Promise<LoginUCOutput | undefined> {
    try {
      this.validators.validateLoginInput(input);

      const user = await this.db.getUserByEmail(input.email);

      if (!user) {
        throw new NotFoundError("User is not registered");
      }

      const isPasswordCorrect = await this.bcrypt.compareHash(
        input.password,
        user.getPassword()
      );

      if (!isPasswordCorrect) {
        throw new UnauthorizedError("Invalid email or password");
      }

      const token = this.jwtAuth.generateToken(user.getId());

      return {
        message: "User successfully logged in",
        token: token,
      };
    } catch (err) {
      throw {
        code: err.statusCode || 400,
        message: err.message || "An error occurred during login",
      };
    }
  }
}

export interface LoginUCInput {
  email: string;
  password: string;
}

export interface LoginUCOutput {
  message: string;
  token: string;
}
