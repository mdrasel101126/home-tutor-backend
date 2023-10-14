import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IReview } from "./review.interface";
import { Review } from "./review.model";
import { User } from "../user/user.model";
import { Tutor } from "../tutor/tutor.model";

const createReview = async (payload: IReview): Promise<IReview> => {
  const { user, tutor } = payload;
  const isTutorExist = await Tutor.isTutorExist(tutor.toString());
  if (!isTutorExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutor is not found!");
  }
  const isUserExist = await User.isUserExist(user.toString());
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User is not found!");
  }
  const result = await Review.create(payload);
  return result;
};

const getUserReviews = async (id: string): Promise<IReview[]> => {
  const result = await Review.find({ user: id });
  return result;
};

export const ReviewService = {
  createReview,
  getUserReviews,
};
