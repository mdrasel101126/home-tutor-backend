/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
export type IUserRole = "user" | "admin" | "super_admin" | "tutor";
type IUserName = {
  firstName: string;
  lastName: string;
};
export type IUser = {
  name: IUserName;
  email: string;
  profileImg?: string;
  role?: string;
  contactNo: string;
  address: string;
  password: string;
};

export type UserModel = {
  isUserExist(id: string): Promise<IUser>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserCreateResponse = {
  user: IUser;
  accessToken: string;
};
export type IUserLoginResponse = {
  accessToken: string;
};
