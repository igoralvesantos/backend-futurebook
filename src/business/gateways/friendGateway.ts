export interface FriendGateway {
  createFriendship(userId: string, friendId: string): Promise<void>
  verifyFriendship(userId: string, friendId: string): Promise<boolean>
  undoFriendship(userId: string, friendId: string): Promise<void>
}