import { Request, Response } from "express";
import { SignupUC } from "../../../business/usecases/user/signup";
import { UserDB } from "../../../data/userDB";
import { JWTAutentication } from "../../../business/services/jwtAutentication";
import { BcryptPassword } from "../../../business/services/bcryptPassword";
import { Validators } from "../../../business/services/validators";

export const signupEndpoint = async (req: Request, res: Response) => {
  try {
    const signupUC = new SignupUC(
      new UserDB(),
      new JWTAutentication(),
      new BcryptPassword(),
      new Validators()
    );

    const result = await signupUC.execute({
      name: req.body.name,
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
