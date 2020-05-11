import { Request, Response } from "express";
import { FriendDB } from "../../../data/friendDB";
import { UndoFriendshipUC } from "../../../business/usecases/user/undoFriendship";
import { JWTAutentication } from "../../../business/services/jwtAutentication";
import { Validators } from "../../../business/services/validators";

export const undoFriendshipEndpoint = async (req: Request, res: Response) => {
  try {
    const undoFriendshipUC = new UndoFriendshipUC(
      new FriendDB(),
      new JWTAutentication(),
      new Validators()
    );

    const result = await undoFriendshipUC.execute({
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
