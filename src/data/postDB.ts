import { BaseDB } from "./baseDB";
import { Post, PostType } from "../business/entities/post";
import { PostGateway } from "../business/gateways/postGateway";

export class PostDB extends BaseDB implements PostGateway {
  private postTableName = "FUTUREBOOK_POSTS";

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

  public async createPost(post: Post): Promise<void> {
    await this.connection.raw(`
      INSERT INTO ${this.postTableName} (
        id, 
        picture, 
        description, 
        creationDate, 
        type,
        userId
      ) 
      VALUES(
        '${post.getId()}',
        '${post.getPicture()}',
        '${post.getDescription()}',
        '${this.mapDateToDBDate(post.getCreationDate())}',
        '${this.mapPostTypeToDB(post.getType())}',
        '${post.getUserId()}'
      );`);

    const authorId = post.getUserId();

    const friendsId = await this.connection.raw(`
      SELECT friend_id
      FROM FUTUREBOOK_FRIENDS
      WHERE user_id = '${authorId}'
    `);

    const authorData = await this.connection.raw(`
      SELECT name, email
      FROM FUTUREBOOK_USERS
      WHERE id = '${authorId}'
    `);

    const promisesArray = friendsId[0].map(async (friend: any) => {
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
          '${friend.friend_id}',
          '${post.getId()}',
          '${post.getPicture()}',
          '${post.getDescription()}',
          '${this.mapDateToDBDate(post.getCreationDate())}',
          '${this.mapPostTypeToDB(post.getType())}',
          '${post.getUserId()}',
          '${authorData[0][0].name}',
          '${authorData[0][0].email}'
        );`);
    });

    await Promise.all(promisesArray);
  }

  public async verifyLike(postId: string, userId: string): Promise<boolean> {
    const result = await this.connection.raw(`
      SELECT * 
      FROM FUTUREBOOK_LIKE_POST
      WHERE userId = '${userId}' 
      AND postId = '${postId}';
    `);

    return !result[0][0] ? false : true;
  }

  public async likePost(postId: string, userId: string): Promise<void> {
    await this.connection.raw(`
      INSERT INTO FUTUREBOOK_LIKE_POST(userId, postId)
      VALUES('${userId}', '${postId}');`);
  }

  public async dislikePost(postId: string, userId: string): Promise<void> {
    await this.connection.raw(`
      DELETE 
      FROM FUTUREBOOK_LIKE_POST
      WHERE userId ='${userId}' AND postId = '${postId}';`);
  }
}
