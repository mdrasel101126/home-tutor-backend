import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwt.helpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get authorization token
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    //verify token
    let verifiedUser = null;

    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.sectret as Secret);

    req.user = verifiedUser; //role , userId

    //role diye guard korar jonno
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
