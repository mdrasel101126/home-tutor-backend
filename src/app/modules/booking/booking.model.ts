import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";

const BookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tutor: {
      type: Schema.Types.ObjectId,
      ref: "Tutor",
    },
  },
  {
    timestamps: true,
  }
);

/* ReviewSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}; */

export const Booking = model<IBooking>("Booking", BookingSchema);
