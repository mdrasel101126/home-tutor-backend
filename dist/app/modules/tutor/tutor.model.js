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
<<<<<<< HEAD
=======
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
>>>>>>> 3ed703440065482e8dcc4c18cd46ffab1b180ede
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const tutor_constant_1 = require("./tutor.constant");
const tutorSchema = new mongoose_1.Schema({
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
        enum: tutor_constant_1.tutorGender,
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
        enum: tutor_constant_1.tutorGroup,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    medium: {
        type: String,
        enum: tutor_constant_1.tutorMedium,
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
        enum: tutor_constant_1.tutorCurrentStatus,
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
        enum: tutor_constant_1.tutorPreferredClass,
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
        enum: tutor_constant_1.tutorMedium,
        required: true,
    },
    notification: [
        {
            tutorId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Tutor',
                required: true,
            },
            userId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            status: {
                type: String,
                required: true,
                enum: tutor_constant_1.statusInfo,
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
                type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
<<<<<<< HEAD
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
=======
tutorSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Tutor.findOne({ email }, { phoneNumber: 1, password: 1, role: 1 });
    });
};
tutorSchema.statics.isPasswordMatch = function (givenPassword, savePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savePassword);
    });
>>>>>>> 3ed703440065482e8dcc4c18cd46ffab1b180ede
};
tutorSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing password
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.jwt.bcrypt_salt_rounds));
        next();
    });
});
const Tutor = (0, mongoose_1.model)('Tutor', tutorSchema);
exports.default = Tutor;
