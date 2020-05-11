import { UserGateway } from "../business/gateways/userGateway";
import { BaseDB } from "./baseDB";
import { User } from "../business/entities/user";

export class UserDB extends BaseDB implements UserGateway {
  private userTableName = "FUTUREBOOK_USERS";

  private mapDBDataToUser(input: any): User {
    return new User(input.id, input.name, input.email, input.password);
  }

  public async createUser(user: User): Promise<void> {
    await this.connection.raw(`
      INSERT INTO ${this.userTableName} (id, name, email, password) 
      VALUES(
        '${user.getId()}',
        '${user.getName()}',
        '${user.getEmail()}',
        '${user.getPassword()}'
      );`);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.connection.raw(
      `SELECT * FROM ${this.userTableName} WHERE email='${email}'`
    );

    return result[0][0] && this.mapDBDataToUser(result[0][0]);
  }
}
