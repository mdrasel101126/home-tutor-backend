import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IChangePassword,
  ILoginRequest,
  ILoginUserResponse,
  IUser,
} from './user.interface';
import User from './user.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import Tutor from '../tutor/tutor.model';
import {
  IGenericResponse,
  IPaginationOptions,
  UserInfoFromToken,
} from '../../../interfaces/common';
import { userFilterableField } from './user.constant';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const checkNumber = await User.findOne({ phoneNumber: user.phoneNumber });
  const checkEmail = await User.findOne({ email: user.email });

  if (checkEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Already used this email!!!');
  }
  if (checkNumber) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Already used this phone number!!!',
    );
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  const result = await User.findById(createdUser._id);
  return result;
};

const loginUser = async (
  payload: ILoginRequest,
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist.");
  }

  if (!(await User.isPasswordMatch(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect.');
  }

  const { role, id } = isUserExist;

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

const refreshToken = async (
  refreshToken: string,
): Promise<{ accessToken: string }> => {
  let verifiedToken;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      refreshToken,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token!!!');
  }
  const isUserExist = await User.isUserExist(verifiedToken.email);
  const isTutorExist = await Tutor.isUserExist(verifiedToken.email);

  if (!isUserExist && !isTutorExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist!!!");
  }
  const newAccessToken = jwtHelpers.createToken(
    verifiedToken.role === 'tutor'
      ? {
          id: isTutorExist.id,
          email: isTutorExist.email,
          role: isTutorExist.role,
        }
      : {
          id: isUserExist.id,
          email: isUserExist.email,
          role: isUserExist.role,
        },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const ownProfile = async (
  userInfo: UserInfoFromToken,
): Promise<IUser | null> => {
  const result = await User.findById(userInfo.id);
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Your profile is not exist!!!');
  }
  return result;
};
export type IUserFilters = {
  searchTerm?: string;
  lowestExpectedSalary?: number;
  highestExpectedSalary?: number;
};

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // for filter data
  if (searchTerm) {
    andConditions.push({
      $or: userFilterableField.map(field => ({
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

  const result = await User.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select({
      unseenNotification: false,
    });

  const count = await User.countDocuments(query);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (
  payload: Partial<IUser>,
  userInfo: UserInfoFromToken,
): Promise<IUser | null> => {
  const isUserExist = await User.findById(userInfo.id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (payload.phoneNumber) {
    const checkNumber = await User.findOne({
      phoneNumber: payload.phoneNumber,
    });
    if (checkNumber) {
      throw new ApiError(httpStatus.CONFLICT, 'Already used this number!!!');
    }
  }
  const result = await User.findOneAndUpdate({ _id: userInfo.id }, payload, {
    new: true,
  });
  return result;
};

const updateUserByAdmin = async (
  payload: Partial<IUser>,
  id: string,
): Promise<IUser | null> => {
  const isUserExist = await User.findById(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (payload.phoneNumber) {
    const checkNumber = await User.findOne({
      phoneNumber: payload.phoneNumber,
    });
    if (checkNumber) {
      throw new ApiError(httpStatus.CONFLICT, 'Already used this number!!!');
    }
  }
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const changeRole = async (
  payload: Partial<IUser>,
  id: string,
): Promise<IUser | null> => {
  const isUserExist = await User.findById(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const changePassword = async (
  userInfo: UserInfoFromToken,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const isUserExist = await User.findById(userInfo.id).select({
    password: true,
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (!(await User.isPasswordMatch(oldPassword, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }
  isUserExist.password = newPassword;
  isUserExist.save();
};
export const UserService = {
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
