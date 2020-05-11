import { Post, PostType } from "./post";

export class Feed extends Post {
  constructor(
    private userFeed: string,
    id: string,
    picture: string,
    description: string,
    creationDate: Date,
    type: PostType,
    userId: string,
    private userName: string,
    private userEmail: string
  ) { 
    super(id, picture, description, creationDate, type, userId) 
  }
  
  public getUserFeed(): string {
    return this.userFeed;
  }

  public setUserFeed(userFeed: string): void {
    this.userFeed = userFeed;
  }

  public getUserName(): string {
    return this.userName;
  }

  public setUserName(userName: string): void {
    this.userName = userName;
  }

  public getUserEmail(): string {
    return this.userEmail;
  }

  public setUserEmail(userEmail: string): void {
    this.userEmail = userEmail;
  }
}