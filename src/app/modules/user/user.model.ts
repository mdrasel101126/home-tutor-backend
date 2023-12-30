import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { userRoles } from './user.constant';
import config from '../../../config';

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: userRoles,
      default: 'user',
    },
    history: [
      {
        tutorId: {
          type: Schema.Types.ObjectId,
          ref: 'Tutor',
          required: true,
        },
        teachingStartDate: {
          type: Date,
          required: true,
        },
        dayPerWeek: {
          type: Number,
          required: true,
        },
        maxSalary: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    unseenNotification: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isUserExist = async function (
  email: string,
): Promise<Pick<IUser, 'id' | 'email' | 'password' | 'role'> | null> {
  return await User.findOne(
    { email },
    { phoneNumber: 1, password: 1, role: 1 },
  );
};

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savePassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword);
};

userSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.jwt.bcrypt_salt_rounds),
  );
  next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
