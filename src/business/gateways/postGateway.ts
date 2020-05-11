import { Post } from "../entities/post";

export interface PostGateway {
  createPost(post: Post): Promise<void>
  verifyLike(postId: string, userId: string): Promise<boolean>
  likePost(postId: string, userId: string): Promise<void>
  dislikePost(postId: string, userId: string): Promise<void>
}