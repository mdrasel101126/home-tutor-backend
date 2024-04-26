import { Request, Response, RequestHandler } from 'express';
import { BookingService } from './booking.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { UserInfoFromToken } from '../../../interfaces/common';

const bookTutor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const bookingData = req.body;

    const result = await BookingService.bookTutor(
      bookingData,
      user as UserInfoFromToken,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Tutor booked Successfully',
    });
  },
);

const getAllBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookingService.getAllBookings();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Bookings retrieved Successfully.',
    });
  },
);

const getAllRequestedBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookingService.getAllRequestedBookings();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'All Requested Bookings retrieved Successfully.',
    });
  },
);

const getOwnBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await BookingService.getOwnBookings(
      user as UserInfoFromToken,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Bookings retrieved Successfully.',
    });
  },
);

const processBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.bookingId;
    const result = await BookingService.processBooking(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result,
    });
  },
);

const cancelBookingByAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.bookingId;
    const result = await BookingService.cancelBookingByAdmin(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result,
    });
  },
);

const cancelBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.bookingId;
    const userInfo = req.user;
    const result = await BookingService.cancelBooking(
      id,
      userInfo as UserInfoFromToken,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result,
    });
  },
);

const confirmBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.bookingId;
    const userInfo = req.user;
    const result = await BookingService.confirmBooking(
      id,
      userInfo as UserInfoFromToken,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result,
    });
  },
);

export const BookingController = {
  bookTutor,
  getAllBookings,
  processBooking,
  cancelBookingByAdmin,
  getOwnBookings,
  cancelBooking,
  confirmBooking,
  getAllRequestedBookings,
};
