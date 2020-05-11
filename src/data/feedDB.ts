import { FeedGateway } from "../business/gateways/feedGateway";
import { BaseDB } from "./baseDB";
import { Feed } from "../business/entities/feed";
import { PostType, Post } from "../business/entities/post";

export class FeedDB extends BaseDB implements FeedGateway {
  private feedTableName = "FUTUREBOOK_FEED";

  private mapDBTypeToPostType(type: string): PostType {
    switch (type) {
      case "normal":
        return PostType.NORMAL;
      case "event":
        return PostType.EVENT;
      default:
        return PostType.NORMAL;
    }
  }

  private mapDBDateToDate(input: string): Date {
    return new Date(input);
  }

  private mapDBDataToFeed(input: any): Feed {
    return new Feed(
      input.userFeed,
      input.postId,
      input.picture,
      input.description,
      this.mapDBDateToDate(input.creationDate),
      this.mapDBTypeToPostType(input.type),
      input.userId,
      input.userName,
      input.userEmail
    );
  }

  public async getFeed(
    userId: string,
    limit: number,
    offset: number
  ): Promise<Feed[]> {
    const response = await this.connection.raw(`
      SELECT * FROM ${this.feedTableName}
      WHERE userFeed = '${userId}'
      ORDER BY creationDate DESC
      LIMIT ${limit} OFFSET ${offset};
    `);

    return response[0].map((feed: any) => {
      return this.mapDBDataToFeed(feed);
    });
  }

  public async getFeedByType(
    userId: string,
    limit: number,
    offset: number,
    type: string
  ): Promise<Feed[]> {
    const response = await this.connection.raw(`
      SELECT * FROM ${this.feedTableName}
      WHERE userFeed = '${userId}' AND type = '${type}'
      ORDER BY creationDate DESC
      LIMIT ${limit} OFFSET ${offset};
    `);

    return response[0].map((feed: any) => {
      return this.mapDBDataToFeed(feed);
    });
  }

  public async getPostByIdFromFeed(
    postId: string,
    userId: string
  ): Promise<Post | undefined> {
    const result = await this.connection.raw(`
      SELECT * 
      FROM ${this.feedTableName}
      WHERE userFeed = '${userId}' AND postId = '${postId}';
    `);

    return result[0][0];
  }
}
