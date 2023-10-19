import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Tutor } from "../tutor/tutor.model";
import { User } from "../user/user.model";

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  const { user, tutor } = payload;
  const isExist = await Booking.findOne({ user, tutor });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Already Booked");
  }
  const isTutorExist = await Tutor.isTutorExist(tutor.toString());
  if (!isTutorExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutor is not found!");
  }
  const isUserExist = await User.isUserExist(user.toString());
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User is not found!");
  }
  const result = await Booking.create(payload);
  return result;
};

const getUserBookings = async (id: string): Promise<IBooking[]> => {
  const result = await Booking.find({ user: id }).populate("tutor");
  return result;
};

const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findOneAndDelete({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Booking not found!");
  }
  return result;
};

export const BookingService = { createBooking, getUserBookings, deleteBooking };
