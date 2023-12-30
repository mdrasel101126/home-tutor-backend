import { Model, Types } from 'mongoose';
import { Status } from '../tutor/tutor.constant';

export type IBooking = {
  userId: Types.ObjectId;
  tutorId: Types.ObjectId;
  status: Status;
  teachingStartDate: Date;
  message: {
    dayPerWeek: number;
    teachingTime: string;
    maxSalary: number;
    location: string;
    description: string;
  };
};

export type BookingModel = Model<IBooking, Record<string, unknown>>;

export enum StatusOption {
  Request = 'request',
  Processing = 'processing',
  Accepted = 'accepted',
  Confirm = 'confirm',
  Disapproved = 'disapproved',
}
