import { Request, Response } from "express";
import { PostDB } from "../../../data/postDB";
import { JWTAutentication } from "../../../business/services/jwtAutentication";
import { LikePostUC } from "../../../business/usecases/post/likePost";
import { FeedDB } from "../../../data/feedDB";
import { Validators } from "../../../business/services/validators";

export const likePostEndpoint = async (req: Request, res: Response) => {
  try {
    const likePostUC = new LikePostUC(
      new PostDB(),
      new FeedDB(),
      new JWTAutentication(),
      new Validators()
    );

    const result = await likePostUC.execute({
      token: req.headers.auth as string,
      postId: req.body.postId,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.code || 400).send({
      message: err.message,
      ...err,
    });
  }
};
