import { Request, Response, RequestHandler } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';
import { ILoginUserResponse } from './user.interface';
import { UserInfoFromToken } from '../../../interfaces/common';
import pick from '../../../shared/pick';
import { userFilterableField } from './user.constant';
import { paginationFields } from '../../../constant';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body;

    const result = await UserService.createUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'User Create Successfully!!!',
    });
  },
);

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const resultWithRefreshToken = await UserService.loginUser(req.body);
  const { refreshToken, ...result } = resultWithRefreshToken;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await UserService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token retrieve successfully!',
    data: result,
  });
});

const ownProfile = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req?.user;

  const result = await UserService.ownProfile(userInfo as UserInfoFromToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved Successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved Successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved Successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user;
  const user = req.body;
  const result = await UserService.updateUser(
    user,
    userInfo as UserInfoFromToken,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated Successfully',
    data: result,
  });
});

const updateUserByAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.body;
  const result = await UserService.updateUserByAdmin(user, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated Successfully',
    data: result,
  });
});

const changeRole = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const role = req.body;
  const result = await UserService.changeRole(role, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Role updated Successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req?.user;

  const result = await UserService.changePassword(
    userInfo as UserInfoFromToken,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed Successfully.',
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
  refreshToken,
  ownProfile,
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserByAdmin,
  changeRole,
  changePassword,
};
