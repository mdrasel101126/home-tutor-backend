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
  promfileImg?: string;
  contactNo: string;
  address: string;
  description: string;
  educationQualification: string;
  preferedClasses: string;
};

export type TutorModel = {
  isTutorExist(id: string): Promise<ITutor>;
} & Model<ITutor>;

export type ITutorFilters = {
  searchTerm?: string;
  preferedClasses?: string;
};

export type ISingleTutorResponse = {
  tutor: ITutor;
  reviews: IReview[];
};
