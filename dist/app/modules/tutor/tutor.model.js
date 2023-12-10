"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutor = void 0;
const mongoose_1 = require("mongoose");
const TutorSchema = new mongoose_1.Schema({
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
    email: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    division: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    policeStation: {
        type: String,
        required: true,
    },
    tutionArea: [
        {
            type: String,
            required: true,
        },
    ],
    role: {
        type: String,
        default: "tutor",
    },
    sallaryRange: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    educationQualification: {
        type: String,
        required: true,
    },
    institutionName: {
        type: String,
        required: true,
    },
    preferedClasses: [
        {
            type: String,
            required: true,
        },
    ],
    preferedSubjects: [
        {
            type: String,
            required: true,
        },
    ],
}, {
    timestamps: true,
});
/* TutorSchema.statics.isTutorExist = async function (
  id: string
): Promise<ITutor | null> {
  return await Tutor.findById(id).select("+password").lean();
};

TutorSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

TutorSchema.pre("save", async function (next) {
  // password hash
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});
TutorSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<ITutor>;
  if (update?.password) {
    update.password = await bcrypt.hash(
      update.password,
      Number(config.bcrypt_salt_round)
    );
  }
  next();
}); */
/* UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}; */
exports.Tutor = (0, mongoose_1.model)("Tutor", TutorSchema);
