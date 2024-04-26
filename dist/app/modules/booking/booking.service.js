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
const tutor_model_1 = __importDefault(require("../tutor/tutor.model"));
const booking_interface_1 = require("./booking.interface");
const booking_model_1 = __importDefault(require("./booking.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const bookTutor = (booking, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield user_model_1.default.findById(user.id);
    if (!userInfo) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User is deleted, create new account!!!');
    }
    booking.userId = user.id;
    const tutor = yield tutor_model_1.default.findById(booking.tutorId);
    if (!tutor) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'There is no tutor with this tutorId!!!');
    }
    const isBooking = yield booking_model_1.default.findOne({
        $and: [{ userId: booking.userId }, { tutorId: booking.tutorId }],
    });
    if (isBooking) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, `You already request for booking him. Your request is in '${isBooking === null || isBooking === void 0 ? void 0 : isBooking.status}' stage.`);
    }
    const result = yield booking_model_1.default.create(booking);
    return result;
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.find().populate(['userId', 'tutorId']);
    return result;
});
const getAllRequestedBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.find({ status: booking_interface_1.StatusOption.Request }).populate([
        'userId',
        'tutorId',
    ]);
    return result;
});
const processBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBooking = yield booking_model_1.default.findById(id);
    if (!isBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking doesn't exist.");
    }
    if (isBooking.status !== 'request') {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Booking is in process.');
    }
    const notification = {
        tutorId: isBooking.tutorId,
        userId: isBooking.userId,
        status: booking_interface_1.StatusOption.Processing,
        teachingStartDate: isBooking.teachingStartDate,
        message: {
            dayPerWeek: isBooking.message.dayPerWeek,
            teachingTime: isBooking.message.teachingTime,
            maxSalary: isBooking.message.maxSalary,
            location: isBooking.message.location,
            description: isBooking.message.description,
        },
    };
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield booking_model_1.default.findOneAndUpdate({ _id: id }, { status: booking_interface_1.StatusOption.Processing }, {
            session,
        });
        yield tutor_model_1.default.findOneAndUpdate({ _id: isBooking.tutorId }, {
            $push: { notification: notification },
            $inc: { unseenNotification: 1 },
        }, {
            session,
        });
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return 'Booking process done successfully.';
});
const getOwnBookings = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.find({
        userId: user.id,
    })
        .populate({
        path: 'tutorId',
        select: {
            fullName: true,
            qualification: true,
            expectedMinSalary: true,
            reviews: true,
            phoneNumber: true,
        },
    })
        .select({ userId: false });
    return result;
});
const cancelBookingByAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBooking = yield booking_model_1.default.findOne({ _id: id });
    if (!isBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking doesn't exist.");
    }
    if (isBooking.status !== booking_interface_1.StatusOption.Request) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Can not cancel booking in '${isBooking.status}' stage.`);
    }
    yield booking_model_1.default.findOneAndUpdate({ _id: id }, { status: booking_interface_1.StatusOption.Disapproved });
    return 'Booking cancel successfully.';
});
const cancelBooking = (id, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const isBooking = yield booking_model_1.default.findOne({
        $and: [{ _id: id }, { userId: userInfo.id }],
    });
    if (!isBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking doesn't exist or this is not your booking.");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (isBooking.status === booking_interface_1.StatusOption.Processing) {
            yield tutor_model_1.default.findOneAndUpdate({ _id: isBooking.tutorId }, {
                $inc: { unseenNotification: -1 },
            }, {
                session,
            });
        }
        if (isBooking.status === booking_interface_1.StatusOption.Accepted) {
            yield user_model_1.default.findOneAndUpdate({ _id: userInfo.id }, {
                $inc: { unseenNotification: -1 },
            }, {
                session,
            });
        }
        yield booking_model_1.default.findOneAndDelete({ $and: [{ _id: id }, { userId: userInfo.id }] }, {
            session,
        });
        yield tutor_model_1.default.findOneAndUpdate({ _id: isBooking.tutorId }, {
            $pull: { notification: { userId: userInfo.id } },
        }, {
            session,
        });
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return 'Booking cancel successfully.';
});
const confirmBooking = (id, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const isBooking = yield booking_model_1.default.findOne({
        $and: [{ _id: id }, { userId: userInfo.id }],
    }).populate(['tutorId']);
    if (!isBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking doesn't exist or this is not your booking.");
    }
    if (isBooking.status !== 'accepted') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking is already processed.');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const tutorHistory = {
            userId: userInfo.id,
            dayPerWeek: isBooking.message.dayPerWeek,
            maxSalary: isBooking.message.maxSalary,
            location: isBooking.message.location,
            description: isBooking.message.description,
            teachingStartDate: isBooking.teachingStartDate,
        };
        const userHistory = {
            tutorId: isBooking.tutorId,
            teachingStartDate: tutorHistory.teachingStartDate,
            dayPerWeek: tutorHistory.dayPerWeek,
            maxSalary: tutorHistory.maxSalary,
            description: tutorHistory.description,
        };
        yield tutor_model_1.default.findOneAndUpdate({ _id: isBooking.tutorId }, {
            $pull: { notification: { userId: userInfo.id } },
            $push: { history: tutorHistory },
            $inc: { totalTuitionTaken: 1 },
        }, {
            session,
        });
        yield booking_model_1.default.findOneAndDelete({ $and: [{ _id: id }, { userId: userInfo.id }] }, {
            session,
        });
        yield user_model_1.default.findOneAndUpdate({ _id: userInfo.id }, {
            $push: { history: userHistory },
            $inc: { unseenNotification: -1 },
        }, {
            session,
        });
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return 'Booking confirm successfully.';
});
exports.BookingService = {
    bookTutor,
    getAllBookings,
    processBooking,
    getOwnBookings,
    cancelBooking,
    confirmBooking,
    cancelBookingByAdmin,
    getAllRequestedBookings,
};
