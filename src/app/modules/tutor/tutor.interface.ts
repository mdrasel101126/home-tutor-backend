/* eslint-disable no-unused-vars */

import { Model } from "mongoose";
import { IReview } from "../review/review.interface";

type IUserName = {
  firstName: string;
  lastName: string;
};
export type ITutor = {
  name: IUserName;
  email: string;
  password: string;
  isAvailable?: boolean;
  profileImg?: string;
  contactNo: string;
  division: string;
  district: string;
  role?: string;
  tutionArea: string[];
  sallaryRange: string;
  description: string;
  educationQualification: string;
  institutionName: string;
  preferedClasses: string[];
  preferedSubjects: string[];
};

export type TutorModel = {
  isTutorExist(id: string): Promise<ITutor>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<ITutor>;

export type ITutorCreateResponse = {
  tutor: ITutor;
  accessToken: string;
};
export type ITutorLoginResponse = {
  accessToken: string;
};

export type ITutorFilters = {
  searchTerm?: string;
  preferedClasses?: string;
  division?: string;
  district?: string;
  sallaryRange?: string;
};

export type ISingleTutorResponse = {
  tutor: ITutor;
  reviews: IReview[];
};
