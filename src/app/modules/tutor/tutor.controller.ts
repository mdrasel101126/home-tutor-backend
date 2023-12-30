import { Request, Response, RequestHandler } from 'express';
import { TutorService } from './tutor.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ILoginUserResponse } from '../user/user.interface';
import config from '../../../config';
import { UserInfoFromToken } from '../../../interfaces/common';
import pick from '../../../shared/pick';
import { tutorFilterableField } from './tutor.constant';
import { paginationFields } from '../../../constant';

const createTutor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TutorService.createTutor(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Tutor create Successfully',
    });
  },
);

const loginTutor = catchAsync(async (req: Request, res: Response) => {
  const resultWithRefreshToken = await TutorService.loginTutor(req.body);
  const { refreshToken, ...result } = resultWithRefreshToken;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor logged in successfully!',
    data: result,
  });
});

const acceptBookingRequest = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const tutor = req.user;
  const result = await TutorService.acceptBookingRequest(
    tutor as UserInfoFromToken,
    userId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result,
  });
});

const cancelBookingRequest = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const tutor = req.user;
  const result = await TutorService.cancelBookingRequest(
    tutor as UserInfoFromToken,
    userId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result,
  });
});

const ownProfile = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req?.user;

  const result = await TutorService.ownProfile(userInfo as UserInfoFromToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved Successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req?.user;

  const result = await TutorService.changePassword(
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

const getSingleTutor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await TutorService.getSingleTutor(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor retrieved Successfully.',
    data: result,
  });
});

const getSingleTutorByUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await TutorService.getSingleTutorByUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor retrieved Successfully.',
    data: result,
  });
});

const getAllTutorsByUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, tutorFilterableField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await TutorService.getAllTutorsByUser(
    filters,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutors retrieved Successfully.',
    data: result,
  });
});

const getSingleTutorByAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await TutorService.getSingleTutorByAdmin(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tutor retrieved Successfully.',
      data: result,
    });
  },
);

const getAllTutorsByAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, tutorFilterableField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await TutorService.getAllTutorsByAdmin(
    filters,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutors retrieved Successfully.',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const tutor = req.body;
  const userInfo = req.user;

  const result = await TutorService.updateProfile(
    id,
    tutor,
    userInfo as UserInfoFromToken,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor updated successfully',
    data: result,
  });
});

const reviewTutor = catchAsync(async (req: Request, res: Response) => {
  const tutorId = req.params.id;
  const review = req.body;
  const userInfo = req.user;

  const result = await TutorService.reviewTutor(
    tutorId,
    review,
    userInfo as UserInfoFromToken,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review post successfully.',
    data: result,
  });
});

export const TutorController = {
  createTutor,
  loginTutor,
  acceptBookingRequest,
  getSingleTutor,
  ownProfile,
  reviewTutor,
  getSingleTutorByUser,
  updateProfile,
  getAllTutorsByUser,
  getSingleTutorByAdmin,
  getAllTutorsByAdmin,
  changePassword,
  cancelBookingRequest,
};
