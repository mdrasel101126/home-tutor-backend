import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import config from "../../../config";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser, UserModel>(
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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    promfileImg: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    contactNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.isUserExist = async function (
  id: string
): Promise<IUser | null> {
  return await User.findById(id).select("+password").lean();
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre("save", async function (next) {
  // password hash
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});
UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<IUser>;
  if (update?.password) {
    update.password = await bcrypt.hash(
      update.password,
      Number(config.bcrypt_salt_round)
    );
  }
  next();
});
/* UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}; */

export const User = model<IUser, UserModel>("User", UserSchema);
