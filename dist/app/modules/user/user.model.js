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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const config_1 = __importDefault(require("../../../config"));
const userSchema = new mongoose_1.Schema({
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
        enum: user_constant_1.userRoles,
        default: 'user',
    },
    history: [
        {
            tutorId: {
                type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
userSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield User.findOne({ email }, { phoneNumber: 1, password: 1, role: 1 });
    });
};
userSchema.statics.isPasswordMatch = function (givenPassword, savePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savePassword);
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing password
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.jwt.bcrypt_salt_rounds));
        next();
    });
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
