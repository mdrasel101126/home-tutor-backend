import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser, IUserCreateResponse } from "../user/user.interface";
import { User } from "../user/user.model";
import { jwtHelpers } from "../../../helpers/jwt.helpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";

const loginUser = async (
  payload: Pick<IUser, "email" | "password">
): Promise<IUserCreateResponse> => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  //console.log(user);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid password!");
  }
  const accessToken = jwtHelpers.createToken(
    { email: user?.email, _id: user?._id, role: user?.role },
    config.jwt.sectret as Secret,
    config.jwt.expires_in as string
  );
  return { newUserData: user, accessToken };
};

export const AuthService = {
  loginUser,
};
