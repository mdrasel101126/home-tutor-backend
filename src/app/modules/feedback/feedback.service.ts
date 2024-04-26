import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IGenericResponse,
  IPaginationOptions,
  UserInfoFromToken,
} from '../../../interfaces/common';
import User from '../user/user.model';
import { IFeedback } from './feedback.interface';
import Feedback from './feedback.model';
import Tutor from '../tutor/tutor.model';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createFeedback = async (
  feedback: Partial<IFeedback>,
  userInfo: UserInfoFromToken,
): Promise<IFeedback | null> => {
  if (userInfo.role === 'tutor') {
    const tutor = await Tutor.findById(userInfo.id);
    if (!tutor) {
      throw new ApiError(httpStatus.CONFLICT, 'Tutor is not exist!!!');
    }
    feedback.name = tutor.fullName;
    feedback.role = 'Tutor';
  } else {
    const user = await User.findById(userInfo.id);
    if (!user) {
      throw new ApiError(httpStatus.CONFLICT, 'User is not exist!!!');
    }
    feedback.name = user.fullName;
    feedback.role = 'Public';
  }

  const result = await Feedback.create(feedback);
  return result;
};

const getAllFeedback = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFeedback[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await Feedback.find().sort(sortConditions);
  const count = await Feedback.countDocuments();

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

export const FeedbackService = {
  createFeedback,
  getAllFeedback,
};
