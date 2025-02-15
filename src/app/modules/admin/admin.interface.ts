/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

type IAdminName = {
  firstName: string;
  lastName: string;
};
export type IAdmin = {
  name: IAdminName;
  email: string;
  contactNo: string;
  division: string;
  district: string;
  policeStation: string;
  profileImg?: string;
};

export type AdminModel = {
  isCusomerExist(id: string): Promise<IAdmin>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

export type IAdminCreateResponse = {
  Cusomer: IAdmin;
  accessToken: string;
};
export type IAdminLoginResponse = {
  accessToken: string;
};
