import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IChangePassword,
  ILoginRequest,
  ILoginUserResponse,
} from '../user/user.interface';
import { ITutor, ITutorFilters } from './tutor.interface';
import Tutor from './tutor.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import User from '../user/user.model';
import {
  IGenericResponse,
  IPaginationOptions,
  UserInfoFromToken,
} from '../../../interfaces/common';
import Booking from '../booking/booking.model';
import mongoose, { SortOrder } from 'mongoose';
import { StatusOption } from '../booking/booking.interface';
import { tutorFilterableField } from './tutor.constant';
import { calculatePagination } from '../../../helpers/paginationHelper';

const createTutor = async (tutor: ITutor): Promise<ITutor | null> => {
  const checkNumber = await Tutor.findOne({ phoneNumber: tutor.phoneNumber });
  const checkEmail = await Tutor.findOne({ email: tutor.email });
  const checkUserEmail = await User.findOne({ email: tutor.email });

  if (checkEmail || checkUserEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Already used this email!!!');
  }
  if (checkNumber) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Already used this phone number!!!',
    );
  }
  const createdTutor = await Tutor.create(tutor);
  if (!createdTutor) {
    throw new ApiError(400, 'Failed to create tutor!');
  }
  const result = await Tutor.findById(createdTutor._id);
  return result;
};
const loginTutor = async (
  payload: ILoginRequest,
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isTutorExist = await Tutor.isUserExist(email);

  if (!isTutorExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'There is no tutor with this email.',
    );
  }

  if (!(await Tutor.isPasswordMatch(password, isTutorExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect.');
  }

  const { role, id } = isTutorExist;
  const accessToken = jwtHelpers.createToken(
    { id, email, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { id, email, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const acceptBookingRequest = async (
  tutor: UserInfoFromToken,
  userId: string,
): Promise<string> => {
  const isBooking = await Booking.findOne({
    $and: [{ userId: userId }, { tutorId: tutor.id }],
  });
  if (!isBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking doesn't exist.");
  }

  if (isBooking.status !== 'processing') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking is in processing.');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    await Booking.findOneAndUpdate(
      { _id: isBooking.id },
      { status: StatusOption.Accepted },
      {
        session,
      },
    );

    await Tutor.findOneAndUpdate(
      { _id: tutor.id },
      {
        $inc: { unseenNotification: -1 },
      },
      {
        session,
      },
    );

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $inc: { unseenNotification: 1 },
      },
      {
        session,
      },
    );

    await Tutor.findOneAndUpdate(
      {
        $and: [{ _id: tutor.id }, { 'notification.userId': userId }],
      },
      {
        $set: {
          'notification.$.status': StatusOption.Accepted,
        },
      },
      {
        session,
      },
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return 'Booking accepted successfully.';
};

const cancelBookingRequest = async (
  tutor: UserInfoFromToken,
  userId: string,
): Promise<string> => {
  const isBooking = await Booking.findOne({
    $and: [{ userId: userId }, { tutorId: tutor.id }],
  });
  if (!isBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking doesn't exist.");
  }

  if (isBooking.status !== 'processing') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking is in processing.');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    await Booking.findOneAndUpdate(
      { _id: isBooking.id },
      { status: StatusOption.Disapproved },
      {
        session,
      },
    );

    await Tutor.findOneAndUpdate(
      { _id: tutor.id },
      {
        $inc: { unseenNotification: -1 },
        $pull: { notification: { userId: userId } },
      },
      {
        session,
      },
    );

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $inc: { unseenNotification: 1 },
      },
      {
        session,
      },
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return 'Booking Canceled successfully.';
};

const ownProfile = async (
  userInfo: UserInfoFromToken,
): Promise<ITutor | null> => {
  const result = await Tutor.findById(userInfo.id);
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Your profile is not exist!!!');
  }
  return result;
};

const changePassword = async (
  userInfo: UserInfoFromToken,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const isUserExist = await Tutor.findById(userInfo.id).select({
    password: true,
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tutor does not exist');
  }

  if (!(await Tutor.isPasswordMatch(oldPassword, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }
  isUserExist.password = newPassword;
  isUserExist.save();
};

const getSingleTutor = async (id: string): Promise<ITutor | null> => {
  const result = await Tutor.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Tutor is not exist!!!');
  }
  return result;
};

const getAllTutorsByUser = async (
  filters: ITutorFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ITutor[]>> => {
  const {
    searchTerm,
    lowestExpectedSalary = 0,
    highestExpectedSalary = Infinity,
    ...filtersData
  } = filters;

  const andConditions = [];

  // for filter salary
  andConditions.push({
    $and: [
      { expectedMinSalary: { $gte: lowestExpectedSalary } },
      { expectedMinSalary: { $lte: highestExpectedSalary } },
    ],
  });

  // for filter data
  if (searchTerm) {
    andConditions.push({
      $or: tutorFilterableField.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // for exact match user and condition
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // if no condition is given
  const query = andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Tutor.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select({
      email: false,
      phoneNumber: false,
      role: false,
      notification: false,
      unseenNotification: false,
      history: false,
    });

  const count = await Tutor.countDocuments(query);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleTutorByUser = async (id: string): Promise<ITutor | null> => {
  const result = await Tutor.findById(id).select({
    email: false,
    phoneNumber: false,
    role: false,
    notification: false,
    unseenNotification: false,
    history: false,
  });
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Tutor is not exist!!!');
  }
  return result;
};

const getAllTutorsByAdmin = async (
  filters: ITutorFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ITutor[]>> => {
  const {
    searchTerm,
    lowestExpectedSalary = 0,
    highestExpectedSalary = Infinity,
    ...filtersData
  } = filters;

  const andConditions = [];

  // for filter salary
  andConditions.push({
    $and: [
      { expectedMinSalary: { $gte: lowestExpectedSalary } },
      { expectedMinSalary: { $lte: highestExpectedSalary } },
    ],
  });

  // for filter data
  if (searchTerm) {
    andConditions.push({
      $or: tutorFilterableField.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // for exact match user and condition
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // if no condition is given
  const query = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Tutor.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select({
      role: false,
      unseenNotification: false,
    });

  const count = await Tutor.countDocuments(query);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleTutorByAdmin = async (id: string): Promise<ITutor | null> => {
  const result = await Tutor.findById(id).select({
    role: false,
    unseenNotification: false,
  });
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Tutor is not exist!!!');
  }
  return result;
};

const updateProfile = async (
  id: string,
  payload: Partial<ITutor>,
  userInfo: UserInfoFromToken,
): Promise<ITutor | null> => {
  const tutor = await Tutor.findById(id);
  if (!tutor) {
    throw new ApiError(httpStatus.CONFLICT, 'Tutor is not exist!!!');
  }

  if (
    userInfo.role !== 'admin' &&
    userInfo.role !== 'admin_tutor' &&
    userInfo.role !== 'super_admin' &&
    id !== userInfo.id.toString()
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You can not update this profile!!!',
    );
  }

  if (payload.phoneNumber) {
    const checkNumber = await Tutor.findOne({
      phoneNumber: payload.phoneNumber,
    });

    if (checkNumber) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'Already used this phone number!!!',
      );
    }
  }
  const result = await Tutor.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const reviewTutor = async (
  tutorId: string,
  review: { name: string; review: string; rating: string },
  userInfo: UserInfoFromToken,
): Promise<void> => {
  const tutor = await Tutor.findById(tutorId);
  if (!tutor) {
    throw new ApiError(httpStatus.CONFLICT, 'Tutor is not exist!!!');
  }
  const user = await User.findById(userInfo.id);
  if (!user) {
    throw new ApiError(httpStatus.CONFLICT, 'User is not exist!!!');
  }
  review.name = user.fullName;
  await Tutor.findOneAndUpdate(
    { _id: tutorId },
    {
      $push: { reviews: review },
    },
  );
};

export const TutorService = {
  createTutor,
  loginTutor,
  getSingleTutor,
  getSingleTutorByUser,
  acceptBookingRequest,
  cancelBookingRequest,
  ownProfile,
  updateProfile,
  reviewTutor,
  getAllTutorsByUser,
  getAllTutorsByAdmin,
  getSingleTutorByAdmin,
  changePassword,
};
