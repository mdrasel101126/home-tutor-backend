/* eslint-disable no-unused-vars */
import mongoose, { Model, Types } from "mongoose";
import { ICusomer } from "../customer/customer.interface";
import { ITutor } from "../tutor/tutor.interface";
import { IAdmin } from "../admin/admin.interface";
export type IUserRole = "customer" | "admin" | "super_admin" | "tutor";

export type IUser = {
  _id: Types.ObjectId | null;
  email: string;
  password: string;
  role?: string;
  profileImg?: string;
  customer?: Types.ObjectId | ICusomer;
  tutor?: Types.ObjectId | ITutor;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = {
  isUserExist(id: string): Promise<IUser>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserCreateResponse = {
  newUserData?: mongoose.Document<unknown, Record<string, never>, IUser> | null;
  accessToken: string;
};
export type IAdminCreateResponse = {
  newUserData?: mongoose.Document<unknown, Record<string, never>, IUser> | null;
};
export type IUserLoginResponse = {
  accessToken: string;
};
