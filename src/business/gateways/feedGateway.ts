import { Feed } from "../entities/feed";
import { Post } from "../entities/post";

export interface FeedGateway {
  getFeed(userId: string, limit: number, offset: number): Promise<Feed[]>
  getFeedByType(userId: string, limit: number, offset: number, type: string): Promise<Feed[]>
  getPostByIdFromFeed(postId: string, userId: string): Promise<Post | undefined>
}