"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    profileImg: {
        type: String,
    },
}, {
    timestamps: true,
});
TutorSchema.statics.isTutorExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.Tutor.findById(id).lean();
    });
};
/*
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
