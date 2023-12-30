import { Schema, model } from 'mongoose';
import { BookingModel, IBooking } from './booking.interface';
import { statusInfo } from '../tutor/tutor.constant';

const bookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tutorId: {
      type: Schema.Types.ObjectId,
      ref: 'Tutor',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: statusInfo,
      default: 'request',
    },
    teachingStartDate: {
      type: Date,
      required: true,
    },
    message: {
      dayPerWeek: {
        type: Number,
        required: true,
      },
      teachingTime: {
        type: String,
        required: true,
      },
      maxSalary: {
        type: Number,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Booking = model<IBooking, BookingModel>('Booking', bookingSchema);

export default Booking;
