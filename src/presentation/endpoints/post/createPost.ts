import { Request, Response } from "express";
import { CreatePostUC } from "../../../business/usecases/post/createPost";
import { PostDB } from "../../../data/postDB";
import { JWTAutentication } from "../../../business/services/jwtAutentication";
import { Validators } from "../../../business/services/validators";

export const creatPostEndpoint = async (req: Request, res: Response) => {
  try {
    const createPostUC = new CreatePostUC(
      new PostDB(),
      new JWTAutentication(),
      new Validators()
    );

    const result = await createPostUC.execute({
      token: req.headers.auth as string,
      picture: req.body.picture,
      description: req.body.description,
      type: req.body.type,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.code || 400).send({
      message: err.message,
      ...err,
    });
  }
};
