import { Request, Response } from "express";
import { FeedDB } from "../../../data/feedDB";
import { JWTAutentication } from "../../../business/services/jwtAutentication";
import { GetFeedByTypeUC } from "../../../business/usecases/feed/getFeedByType";
import { Validators } from "../../../business/services/validators";

export const getFeedByTypeEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new GetFeedByTypeUC(
      new FeedDB(),
      new JWTAutentication(),
      new Validators()
    );

    const result = await uc.execute({
      token: req.headers.auth as string,
      type: req.body.type,
      page: req.body.page,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.code || 400).send({
      message: err.message,
      ...err,
    });
  }
};
