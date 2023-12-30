import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { UserInfoFromToken } from '../../../interfaces/common';
import Tutor from '../tutor/tutor.model';
import { IBooking, StatusOption } from './booking.interface';
import Booking from './booking.model';
import User from '../user/user.model';
import mongoose from 'mongoose';

const bookTutor = async (
  booking: Partial<IBooking>,
  user: UserInfoFromToken,
): Promise<IBooking | null> => {
  const userInfo = await User.findById(user.id);

  if (!userInfo) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'User is deleted, create new account!!!',
    );
  }
  booking.userId = user.id;

  const tutor = await Tutor.findById(booking.tutorId);
  if (!tutor) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'There is no tutor with this tutorId!!!',
    );
  }
  const isBooking = await Booking.findOne({
    $and: [{ userId: booking.userId }, { tutorId: booking.tutorId }],
  });

  if (isBooking) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `You already request for booking him. Your request is in '${isBooking?.status}' stage.`,
    );
  }
  const result = await Booking.create(booking);

  return result;
};

const getAllBookings = async (): Promise<IBooking[]> => {
  const result = await Booking.find().populate(['userId', 'tutorId']);
  return result;
};

const getAllRequestedBookings = async (): Promise<IBooking[]> => {
  const result = await Booking.find({ status: StatusOption.Request }).populate([
    'userId',
    'tutorId',
  ]);
  return result;
};

const processBooking = async (id: string): Promise<string> => {
  const isBooking = await Booking.findById(id);
  if (!isBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking doesn't exist.");
  }
  if (isBooking.status !== 'request') {
    throw new ApiError(httpStatus.CONFLICT, 'Booking is in process.');
  }
  const notification = {
    tutorId: isBooking.tutorId,
    userId: isBooking.userId,
    status: StatusOption.Processing,
    teachingStartDate: isBooking.teachingStartDate,
    message: {
      dayPerWeek: isBooking.message.dayPerWeek,
      teachingTime: isBooking.message.teachingTime,
      maxSalary: isBooking.message.maxSalary,
      location: isBooking.message.location,
      description: isBooking.message.description,
    },
  };
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    await Booking.findOneAndUpdate(
      { _id: id },
      { status: StatusOption.Processing },
      {
        session,
      },
    );

    await Tutor.findOneAndUpdate(
      { _id: isBooking.tutorId },
      {
        $push: { notification: notification },
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
  return 'Booking process done successfully.';
};

const getOwnBookings = async (user: UserInfoFromToken): Promise<IBooking[]> => {
  const result = await Booking.find({
    userId: user.id,
  })
    .populate({
      path: 'tutorId',
      select: {
        fullName: true,
        qualification: true,
        expectedMinSalary: true,
        reviews: true,
        phoneNumber: true,
      },
    })
    .select({ userId: false });
  return result;
};

const cancelBookingByAdmin = async (id: string): Promise<string> => {
  const isBooking = await Booking.findOne({ _id: id });

  if (!isBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking doesn't exist.");
  }
  if (isBooking.status !== StatusOption.Request) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Can not cancel booking in '${isBooking.status}' stage.`,
    );
  }

  await Booking.findOneAndUpdate(
    { _id: id },
    { status: StatusOption.Disapproved },
  );
  return 'Booking cancel successfully.';
};

const cancelBooking = async (
  id: string,
  userInfo: UserInfoFromToken,
): Promise<string> => {
  const isBooking = await Booking.findOne({
    $and: [{ _id: id }, { userId: userInfo.id }],
  });

  if (!isBooking) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Booking doesn't exist or this is not your booking.",
    );
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (isBooking.status === StatusOption.Processing) {
      await Tutor.findOneAndUpdate(
        { _id: isBooking.tutorId },
        {
          $inc: { unseenNotification: -1 },
        },
        {
          session,
        },
      );
    }
    if (isBooking.status === StatusOption.Accepted) {
      await User.findOneAndUpdate(
        { _id: userInfo.id },
        {
          $inc: { unseenNotification: -1 },
        },
        {
          session,
        },
      );
    }
    await Booking.findOneAndDelete(
      { $and: [{ _id: id }, { userId: userInfo.id }] },
      {
        session,
      },
    );

    await Tutor.findOneAndUpdate(
      { _id: isBooking.tutorId },
      {
        $pull: { notification: { userId: userInfo.id } },
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

  return 'Booking cancel successfully.';
};

const confirmBooking = async (
  id: string,
  userInfo: UserInfoFromToken,
): Promise<string> => {
  const isBooking = await Booking.findOne({
    $and: [{ _id: id }, { userId: userInfo.id }],
  }).populate(['tutorId']);

  if (!isBooking) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Booking doesn't exist or this is not your booking.",
    );
  }

  if (isBooking.status !== 'accepted') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking is already processed.');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const tutorHistory = {
      userId: userInfo.id,
      dayPerWeek: isBooking.message.dayPerWeek,
      maxSalary: isBooking.message.maxSalary,
      location: isBooking.message.location,
      description: isBooking.message.description,
      teachingStartDate: isBooking.teachingStartDate,
    };

    const userHistory = {
      tutorId: isBooking.tutorId,
      teachingStartDate: tutorHistory.teachingStartDate,
      dayPerWeek: tutorHistory.dayPerWeek,
      maxSalary: tutorHistory.maxSalary,
      description: tutorHistory.description,
    };

    await Tutor.findOneAndUpdate(
      { _id: isBooking.tutorId },
      {
        $pull: { notification: { userId: userInfo.id } },
        $push: { history: tutorHistory },
        $inc: { totalTuitionTaken: 1 },
      },
      {
        session,
      },
    );
    await Booking.findOneAndDelete(
      { $and: [{ _id: id }, { userId: userInfo.id }] },
      {
        session,
      },
    );

    await User.findOneAndUpdate(
      { _id: userInfo.id },
      {
        $push: { history: userHistory },
        $inc: { unseenNotification: -1 },
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

  return 'Booking confirm successfully.';
};

export const BookingService = {
  bookTutor,
  getAllBookings,
  processBooking,
  getOwnBookings,
  cancelBooking,
  confirmBooking,
  cancelBookingByAdmin,
  getAllRequestedBookings,
};
