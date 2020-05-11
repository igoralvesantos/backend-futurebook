import { Request, Response } from "express";
import { LoginUC } from "../../../business/usecases/user/login";
import { UserDB } from "../../../data/userDB";
import { JWTAutentication } from "../../../business/services/jwtAutentication";
import { BcryptPassword } from "../../../business/services/bcryptPassword";
import { Validators } from "../../../business/services/validators";

export const loginEndpoint = async (req: Request, res: Response) => {
  try {
    const loginUC = new LoginUC(
      new UserDB(),
      new JWTAutentication(),
      new BcryptPassword(),
      new Validators()
    );

    const result = await loginUC.execute({
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.code || 400).send({
      message: err.message,
      ...err,
    });
  }
};
