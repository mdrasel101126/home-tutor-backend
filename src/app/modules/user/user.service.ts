import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwt.helpers";
import { IUser, IUserCreateResponse } from "./user.interface";
import { User } from "./user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find({});
  return result;
};
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });
  return result;
};

const createUser = async (payload: IUser): Promise<IUserCreateResponse> => {
  const user = await User.create(payload);
  const accessToken = jwtHelpers.createToken(
    { email: user.email, _id: user._id, role: user?.role },
    config.jwt.sectret as Secret,
    config.jwt.expires_in as string
  );
  return { user, accessToken };
};

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
  return { accessToken, user: user };
};

const getProfile = async (id: string): Promise<IUser | null> => {
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return isUserExist;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User id not found!");
  }

  const { name, ...userData } = payload;

  const updatedData: Partial<IUser> = userData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).map((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return result;
};

const updateProfile = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const { name, ...userData } = payload;

  if (userData.role) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User role can not be changed!");
  }
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User id not found!");
  }

  const updatedData: Partial<IUser> = userData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).map((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  return result;
};

export const UserService = {
  createUser,
  loginUser,
  getProfile,
  updateSingleUser,
  updateProfile,
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
};
