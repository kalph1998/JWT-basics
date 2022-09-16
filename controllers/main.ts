import { Response, Request, NextFunction } from "express";
import { CustomAPIError } from "../errors/custom-error";
import Jwt from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send("please provide email and password");
      return;
    }
    const id = new Date().getDate();

    const token = Jwt.sign({ username, id }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });

    res.status(200).json({
      msg: "user created",
      token,
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const dashboard = async (req: Request, res: Response) => {
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${(req as any).user.username} `,
      secret: "here is your lucky number " + luckyNumber,
    });
  } catch (error) {
    res.status(401).json({
      msg: "not authorized to access this route",
    });
    return;
  }
};

export { login, dashboard };
