import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import {
  ISingleTutorResponse,
  ITutor,
  ITutorCreateResponse,
  ITutorLoginResponse,
} from "./tutor.interface";
import { TutorService } from "./tutor.sevice";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { tutorFilterableFields } from "./tutor.constants";
import { paginationFields } from "../../../constants/pagination";
import { IGenericResponse } from "../../../interfaces/common";

const createTutor = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorService.createTutor(req.body);
  return sendResponse<ITutorCreateResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tutor created successfully",
    data: result,
  });
});

const loginTutor = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorService.loginTutor(req.body);
  return sendResponse<ITutorLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User log in successfully",
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorService.getProfile(req.user?._id);
  return sendResponse<ITutor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tutor profile retrived successfully",
    data: result,
  });
});

const getTutors = catchAsync(async (req: Request, res: Response) => {
  //console.log(req.query);
  const filters = pick(req.query, tutorFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await TutorService.getTutors(filters, paginationOptions);
  return sendResponse<IGenericResponse<ITutor[]>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tutors retrived successfully",
    data: result,
  });
});

const getSingleTutor = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorService.getSingleTutor(req.params?.id);
  return sendResponse<ISingleTutorResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tutor retrived successfully",
    data: result,
  });
});

const updateTutor = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorService.updateTutor(req.params?.id, req.body);
  return sendResponse<ITutor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tutor updated successfully",
    data: result,
  });
});
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorService.updateProfile(req.user?._id, req.body);
  return sendResponse<ITutor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tutor updated successfully",
    data: result,
  });
});
const deleteTutor = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorService.deleteTutor(req.params?.id);
  return sendResponse<ITutor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tutor deleted successfully",
    data: result,
  });
});
export const TutorController = {
  createTutor,
  getTutors,
  getSingleTutor,
  deleteTutor,
  updateTutor,
  loginTutor,
  getProfile,
  updateProfile,
};
