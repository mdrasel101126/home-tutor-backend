import { Schema, model } from "mongoose";
import { ITutor, TutorModel } from "./tutor.interface";

const TutorSchema = new Schema<ITutor, TutorModel>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    educationQualification: {
      type: String,
      required: true,
    },
    preferedClasses: {
      type: String,
      required: true,
    },
    promfileImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

TutorSchema.statics.isTutorExist = async function (
  id: string
): Promise<ITutor | null> {
  return await Tutor.findOne({ _id: id }).lean();
};

/* BookSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};
 */
export const Tutor = model<ITutor, TutorModel>("Tutor", TutorSchema);
