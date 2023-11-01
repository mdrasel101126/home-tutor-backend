import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { tutorSearchableFields } from "./tutor.constants";
import {
  ISingleTutorResponse,
  ITutor,
  ITutorCreateResponse,
  ITutorFilters,
} from "./tutor.interface";
import { Tutor } from "./tutor.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Review } from "../review/review.model";
import { jwtHelpers } from "../../../helpers/jwt.helpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const createTutor = async (payload: ITutor): Promise<ITutorCreateResponse> => {
  const tutor = await Tutor.create(payload);
  const accessToken = jwtHelpers.createToken(
    { email: tutor.email, _id: tutor._id, role: tutor?.role },
    config.jwt.sectret as Secret,
    config.jwt.expires_in as string
  );
  return { tutor, accessToken };
};

const loginTutor = async (
  payload: Pick<ITutor, "email" | "password">
): Promise<ITutorCreateResponse> => {
  const tutor = await Tutor.findOne({ email: payload.email }).select(
    "+password"
  );
  //console.log(user);
  if (!tutor) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutor not found!");
  }
  const isPasswordMatched = await Tutor.isPasswordMatched(
    payload.password,
    tutor.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid password!");
  }
  const accessToken = jwtHelpers.createToken(
    { email: tutor?.email, _id: tutor?._id, role: tutor?.role },
    config.jwt.sectret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken, tutor: tutor };
};

const getTutors = async (
  filters: ITutorFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITutor[]>> => {
  const andCoditions = [];
  const { searchTerm, ...filtersData } = filters;
  if (searchTerm) {
    andCoditions.push({
      $or: tutorSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCoditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: "i",
        },
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions = andCoditions.length > 0 ? { $and: andCoditions } : {};

  const result = await Tutor.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Tutor.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleTutor = async (id: string): Promise<ISingleTutorResponse> => {
  const isBookExist = await Tutor.isTutorExist(id);
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutor not found");
  }
  const reviws = await Review.find({ tutor: id }).populate("user");

  return {
    tutor: isBookExist,
    reviews: reviws,
  };
};

const updateTutor = async (
  id: string,
  payload: Partial<ITutor>
): Promise<ITutor | null> => {
  const isExist = await Tutor.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutor id not found!");
  }

  const { name, ...userData } = payload;

  const updatedData: Partial<ITutor> = userData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).map((key) => {
      const nameKey = `name.${key}` as keyof Partial<ITutor>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Tutor.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return result;
};
const updateProfile = async (
  id: string,
  payload: Partial<ITutor>
): Promise<ITutor | null> => {
  const isExist = await Tutor.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutor id not found!");
  }

  const { name, ...userData } = payload;

  const updatedData: Partial<ITutor> = userData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).map((key) => {
      const nameKey = `name.${key}` as keyof Partial<ITutor>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Tutor.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return result;
};

const getProfile = async (id: string): Promise<ITutor | null> => {
  const isUserExist = await Tutor.isTutorExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutor not found");
  }

  return isUserExist;
};

const deleteTutor = async (id: string): Promise<ITutor | null> => {
  const isTutorExist = await Tutor.isTutorExist(id);
  if (!isTutorExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutor not found");
  }
  const result = await Tutor.findByIdAndDelete(id);
  await Review.deleteMany({ tutor: id });

  return result;
};

export const TutorService = {
  createTutor,
  getTutors,
  getSingleTutor,
  deleteTutor,
  updateTutor,
  loginTutor,
  getProfile,
  updateProfile,
};
