import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.sevice";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ITutor } from "../tutor/tutor.interface";
import { IUser } from "../user/user.interface";

const getProfile = catchAsync(async (req: Request, res: Response) => {
  if (req.user?.role === "tutor") {
    const result = await AuthService.getTutorProfile(req.user?._id);
    return sendResponse<ITutor>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tutor profile retrived successfully",
      data: result,
    });
  } else {
    const result = await AuthService.getUserProfile(req.user?._id);
    return sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile retrived successfully",
      data: result,
    });
  }
});

export const AuthController = {
  getProfile,
};
