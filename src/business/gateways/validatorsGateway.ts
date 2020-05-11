export interface ValidatorsGateway {
  validateGetFeedInput(input: any): void;
  validateGetFeedByTypeInput(input: any): void;
  validateCreatePostInput(input: any): void;
  validateDislikePostInput(input: any): void;
  validateLikePostInput(input: any): void;
  validateLoginInput(input: any): void;
  validateMakeFriendshipInput(input: any): void;
  validateSignupInput(input: any): void;
  validateUndoFriendshipInput(input: any): void;
}