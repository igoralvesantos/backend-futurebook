export class Post {
  constructor(
    private id: string,
    private picture: string,
    private description: string,
    private creationDate: Date,
    private type: PostType,
    private userId: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getPicture(): string {
    return this.picture
  }

  public setPicture(picture: string): void {
    this.picture = picture;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getCreationDate(): Date {
    return this.creationDate
  }

  public setCreationDate(creationDate: Date): void {
    this.creationDate = creationDate;
  } 

  public getType(): PostType {
    return this.type
  }
  
  public setType(type: PostType): void {
    this.type = type;
  }

  public getUserId(): string {
    return this.userId
  }
  
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public static mapStringsToPostType(type: string): PostType {
    switch (type) {
      case "normal":
        return PostType.NORMAL;
      case "event":
        return PostType.EVENT;
      default:
        throw new Error("Tipo de post invalido");
    }
  }
}

export enum PostType {
  NORMAL = "normal",
  EVENT = "event"
}