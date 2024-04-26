import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { ITutor, TutorModel } from './tutor.interface';
import {
  statusInfo,
  tutorCurrentStatus,
  tutorGender,
  tutorGroup,
  tutorMedium,
  tutorPreferredClass,
} from './tutor.constant';

const tutorSchema = new Schema<ITutor>(
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
    imgUrl: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: 'tutor',
    },
    gender: {
      type: String,
      enum: tutorGender,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      enum: tutorGroup,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    medium: {
      type: String,
      enum: tutorMedium,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    expertIn: {
      type: [String],
      required: true,
    },
    currentStatus: {
      type: String,
      enum: tutorCurrentStatus,
      required: true,
      default: 'available',
    },
    expectedMinSalary: {
      type: Number,
      required: true,
    },
    dayPerWeek: {
      type: Number,
      required: true,
    },
    preferredClass: {
      type: String,
      enum: tutorPreferredClass,
      required: true,
      default: '1-12',
    },
    preferredArea: {
      type: String,
      required: true,
    },
    preferredSubject: {
      type: String,
      required: true,
    },
    preferredMedium: {
      type: String,
      enum: tutorMedium,
      required: true,
    },
    notification: [
      {
        tutorId: {
          type: Schema.Types.ObjectId,
          ref: 'Tutor',
          required: true,
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        status: {
          type: String,
          required: true,
          enum: statusInfo,
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
    ],
    history: [
      {
        userId: {
          type: Schema.Types.ObjectId,
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
        location: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        teachingStartDate: {
          type: Date,
          required: true,
        },
      },
    ],
<<<<<<< HEAD
    profileImg: {
      type: String,
=======
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
      },
    ],
    totalTuitionTaken: {
      type: Number,
      required: true,
      default: 0,
    },
    currentTuition: {
      type: Number,
      required: true,
      default: 0,
    },
    maximumTuitionCapacity: {
      type: Number,
      required: true,
      default: 5,
    },
    unseenNotification: {
      type: Number,
      required: true,
      default: 0,
>>>>>>> 3ed703440065482e8dcc4c18cd46ffab1b180ede
    },
  },
  {
    timestamps: true,
  },
);

<<<<<<< HEAD
TutorSchema.statics.isTutorExist = async function (
  id: string
): Promise<ITutor | null> {
  return await Tutor.findById(id).lean();
};

/*
TutorSchema.statics.isPasswordMatched = async function (
=======
tutorSchema.statics.isUserExist = async function (
  email: string,
): Promise<Pick<ITutor, 'id' | 'email' | 'password' | 'role'> | null> {
  return await Tutor.findOne(
    { email },
    { phoneNumber: 1, password: 1, role: 1 },
  );
};

tutorSchema.statics.isPasswordMatch = async function (
>>>>>>> 3ed703440065482e8dcc4c18cd46ffab1b180ede
  givenPassword: string,
  savePassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword);
};

tutorSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.jwt.bcrypt_salt_rounds),
  );
  next();
});

const Tutor = model<ITutor, TutorModel>('Tutor', tutorSchema);

export default Tutor;
