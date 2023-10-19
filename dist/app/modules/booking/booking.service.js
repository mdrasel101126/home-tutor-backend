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
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const booking_model_1 = require("./booking.model");
const tutor_model_1 = require("../tutor/tutor.model");
const user_model_1 = require("../user/user.model");
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, tutor } = payload;
    const isExist = yield booking_model_1.Booking.findOne({ user, tutor });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Already Booked");
    }
    const isTutorExist = yield tutor_model_1.Tutor.isTutorExist(tutor.toString());
    if (!isTutorExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Tutor is not found!");
    }
    const isUserExist = yield user_model_1.User.isUserExist(user.toString());
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User is not found!");
    }
    const result = yield booking_model_1.Booking.create(payload);
    return result;
});
const getUserBookings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ user: id }).populate("tutor");
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findOneAndDelete({ _id: id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Booking not found!");
    }
    return result;
});
exports.BookingService = { createBooking, getUserBookings, deleteBooking };
