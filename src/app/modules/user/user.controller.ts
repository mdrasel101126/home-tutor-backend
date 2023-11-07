import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  IUser,
  IUserCreateResponse,
  IUserLoginResponse,
} from "./user.interface";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);
  return sendResponse<IUserCreateResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrived successfully",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrived successfully",
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.loginUser(req.body);
  return sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User log in successfully",
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getProfile(req.user?._id);
  return sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrived successfully",
    data: result,
  });
});
const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;
  const result = await UserService.updateSingleUser(id, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});
const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?._id;
  const { ...updatedData } = req.body;
  const result = await UserService.updateProfile(id, updatedData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const totalUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.totalUsers();
  sendResponse<number>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
  getProfile,
  updateSingleUser,
  deleteSingleUser,
  updateProfile,
  getAllUsers,
  getSingleUser,
  totalUsers,
};
