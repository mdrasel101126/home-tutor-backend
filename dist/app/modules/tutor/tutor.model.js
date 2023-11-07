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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutor = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
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
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
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
        return yield exports.Tutor.findById(id).select("+password").lean();
    });
};
TutorSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
TutorSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // password hash
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
TutorSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (update === null || update === void 0 ? void 0 : update.password) {
            update.password = yield bcrypt_1.default.hash(update.password, Number(config_1.default.bcrypt_salt_round));
        }
        next();
    });
});
/* UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}; */
exports.Tutor = (0, mongoose_1.model)("Tutor", TutorSchema);
