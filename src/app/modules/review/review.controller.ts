import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IReview } from "./review.interface";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReview(req.body);
  return sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review added successfully",
    data: result,
  });
});
const getUserReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getUserReviews(req.user?._id);
  return sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrived successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getUserReviews,
};
