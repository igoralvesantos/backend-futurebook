import { Request, Response } from "express";
import { MakeFriendshipUC } from "../../../business/usecases/user/makeFriendship";
import { FriendDB } from "../../../data/friendDB";
import { JWTAutentication } from "../../../business/services/jwtAutentication";
import { Validators } from "../../../business/services/validators";

export const makeFriendshipEndpoint = async (req: Request, res: Response) => {
  try {
    const makeFriendshipUC = new MakeFriendshipUC(
      new FriendDB(),
      new JWTAutentication(),
      new Validators()
    );

    const result = await makeFriendshipUC.execute({
      token: req.headers.auth as string,
      friendId: req.body.friendId,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.code || 400).send({
      message: err.message,
      ...err,
    });
  }
};
