import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwt.helpers";
import {
  IAdminCreateResponse,
  IUser,
  IUserCreateResponse,
} from "./user.interface";
import { User } from "./user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ICusomer } from "../customer/customer.interface";
import mongoose from "mongoose";
import { Customer } from "../customer/customer.model";
import { Admin } from "../admin/admin.model";
import { IAdmin } from "../admin/admin.interface";
import { ITutor } from "../tutor/tutor.interface";
import { Tutor } from "../tutor/tutor.model";

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find({});
  return result;
};
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });
  return result;
};

/* const createUser = async (payload: IUser): Promise<IUserCreateResponse> => {
  const user = await User.create(payload);
  const accessToken = jwtHelpers.createToken(
    { email: user.email, _id: user._id, role: user?.role },
    config.jwt.sectret as Secret,
    config.jwt.expires_in as string
  );
  return { user, accessToken };
}; */
const createCustomer = async (
  customer: ICusomer,
  user: IUser
): Promise<IUserCreateResponse | null> => {
  user.role = "customer";
  let newUserData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newCustomer = await Customer.create([customer], { session });
    if (!newCustomer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create Customer");
    }
    user.customer = newCustomer[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    newUserData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserData) {
    newUserData = await User.findById(newUserData._id).populate("customer");
  }
  const accessToken = jwtHelpers.createToken(
    {
      email: newUserData?.email,
      _id: newUserData?._id,
      role: newUserData?.role,
    },
    config.jwt.sectret as Secret,
    config.jwt.expires_in as string
  );
  return { newUserData, accessToken };
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IAdminCreateResponse | null> => {
  user.role = "admin";
  let newUserData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    user.admin = newAdmin[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    newUserData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserData) {
    newUserData = await User.findById(newUserData._id).populate("admin");
  }

  return { newUserData };
};
const createTutor = async (
  tutor: ITutor,
  user: IUser
): Promise<IUserCreateResponse | null> => {
  user.role = "tutor";
  let newUserData = null;
  //console.log({ tutor, user });
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newTutor = await Tutor.create([tutor], { session });
    if (!newTutor.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create tutor");
    }
    user.tutor = newTutor[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    newUserData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserData) {
    newUserData = await User.findById(newUserData._id).populate("tutor");
  }
  const accessToken = jwtHelpers.createToken(
    {
      email: newUserData?.email,
      _id: newUserData?._id,
      role: newUserData?.role,
    },
    config.jwt.sectret as Secret,
    config.jwt.expires_in as string
  );
  return { newUserData, accessToken };
};

const getProfile = async (id: string): Promise<IUser | null> => {
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return isUserExist;
};

/* const updateSingleUser = async (
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
 */
/* const updateProfile = async (
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
}; */

const deleteSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  return result;
};

const totalUsers = async (): Promise<number> => {
  const result = await User.find().count();
  return result;
};

export const UserService = {
  //createUser,
  //loginUser,
  getProfile,
  /* updateSingleUser,
  updateProfile, */
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
  totalUsers,
  createCustomer,
  createAdmin,
  createTutor,
};
