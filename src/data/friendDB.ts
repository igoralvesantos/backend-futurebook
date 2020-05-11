import { FriendGateway } from "../business/gateways/friendGateway";
import { BaseDB } from "./baseDB";
import { PostType } from "../business/entities/post";

export class FriendDB extends BaseDB implements FriendGateway {
  private friendsTableName = "FUTUREBOOK_FRIENDS";

  private mapPostTypeToDB(type: PostType): string {
    switch (type) {
      case PostType.NORMAL:
        return "normal";
      case PostType.EVENT:
        return "event";
      default:
        return "normal";
    }
  }

  private mapDateToDBDate(input: Date): string {
    return input.toISOString().slice(0, 19).replace("T", " ");
  }

  public async createFriendship(
    userId: string,
    friendId: string
  ): Promise<void> {
    await this.connection.raw(`
      INSERT INTO ${this.friendsTableName} (user_id, friend_id) 
      VALUES(
        '${userId}',
        '${friendId}'
      );`);

    const postsResult = await this.connection.raw(
      `SELECT FUTUREBOOK_POSTS.*, FUTUREBOOK_USERS.name, FUTUREBOOK_USERS.email
      FROM FUTUREBOOK_POSTS
      JOIN FUTUREBOOK_USERS on FUTUREBOOK_USERS.id = FUTUREBOOK_POSTS.userId
      WHERE userId= '${friendId}';`
    );

    const promisesArray = postsResult[0].map(async (post: any) => {
      return await this.connection.raw(`
      INSERT INTO FUTUREBOOK_FEED(
        userFeed,
        postId,
        picture,
        description,
        creationDate,
        type,
        userId,
        userName,
        userEmail
      )
      VALUES(
        '${userId}',
        '${post.id}',
        '${post.picture}',
        '${post.description}',
        '${this.mapDateToDBDate(post.creationDate)}',
        '${this.mapPostTypeToDB(post.type)}',
        '${post.userId}',
        '${post.name}',
        '${post.email}'
      );`);
    });

    await Promise.all(promisesArray);
  }

  public async verifyFriendship(
    userId: string,
    friendId: string
  ): Promise<boolean> {
    const result = await this.connection.raw(`
      SELECT * 
      FROM ${this.friendsTableName}
      WHERE user_id = '${userId}' 
      AND friend_id = '${friendId}';
    `);

    return !result[0][0] ? false : true;
  }

  public async undoFriendship(userId: string, friendId: string): Promise<void> {
    await this.connection.raw(`
      DELETE 
      FROM ${this.friendsTableName}
      WHERE user_id = '${userId}'
      AND friend_id = '${friendId}';
    `);

    await this.connection.raw(`
      DELETE 
      FROM FUTUREBOOK_FEED
      WHERE userFeed = '${userId}'
      AND userId = '${friendId}';
    `);
  }
}
