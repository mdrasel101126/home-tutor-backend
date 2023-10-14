import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IBooking } from "./booking.interface";
import { BookingService } from "./booking.service";
import httpStatus from "http-status";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(req.body);
  return sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking added successfully",
    data: result,
  });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getUserBookings(req.user?._id);
  return sendResponse<IBooking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrived successfully",
    data: result,
  });
});
export const BookingController = { createBooking, getUserBookings };
