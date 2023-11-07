import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { ITutor } from "../tutor/tutor.interface";
import { Tutor } from "../tutor/tutor.model";

const getUserProfile = async (id: string): Promise<IUser | null> => {
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return isUserExist;
};
const getTutorProfile = async (id: string): Promise<ITutor | null> => {
  const isUserExist = await Tutor.isTutorExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutor not found");
  }

  return isUserExist;
};

export const AuthService = {
  getUserProfile,
  getTutorProfile,
};
