import { Types } from "mongoose";
import { IUser } from "../user/user.interface";
import { ITutor } from "../tutor/tutor.interface";

export type IReview = {
  review: string;
  user: Types.ObjectId | IUser;
  tutor: Types.ObjectId | ITutor;
};
