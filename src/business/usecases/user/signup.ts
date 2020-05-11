import { v4 } from "uuid";
import { User } from "../../entities/user";
import { UserGateway } from "../../gateways/userGateway";
import { BcryptPasswordGateway } from "../../gateways/bcryptPassword";
import { JWTAutenticationGateway } from "../../gateways/jwtAutenticationGateway";
import { ValidatorsGateway } from "../../gateways/validatorsGateway";

export class SignupUC {
  constructor(
    private db: UserGateway,
    private jwtAuth: JWTAutenticationGateway,
    private bcrypt: BcryptPasswordGateway,
    private validators: ValidatorsGateway
  ) {}

  public async execute(
    input: SignupUCInput
  ): Promise<SignupUCOutput | undefined> {
    try {
      this.validators.validateSignupInput(input);

      const id = v4();

      const hashPassword = await this.bcrypt.generateHash(input.password);

      const newUser = new User(id, input.name, input.email, hashPassword);

      const token = this.jwtAuth.generateToken(newUser.getId());

      await this.db.createUser(newUser);

      return {
        message: "User successfully created",
        token: token,
      };
    } catch (err) {
      throw {
        code: err.statusCode || 400,
        message: err.message || "An error occurred during sign up",
      };
    }
  }
}

export interface SignupUCInput {
  name: string;
  email: string;
  password: string;
}

export interface SignupUCOutput {
  message: string;
  token: string;
}
