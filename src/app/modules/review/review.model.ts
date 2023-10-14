import { Schema, model } from "mongoose";
import { IReview } from "./review.interface";

const ReviewSchema = new Schema<IReview>(
  {
    review: {
      type: String,
      required: true,
    },
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

ReviewSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

export const Review = model<IReview>("Review", ReviewSchema);
