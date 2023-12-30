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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const tutor_model_1 = __importDefault(require("./tutor.model"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const user_model_1 = __importDefault(require("../user/user.model"));
const booking_model_1 = __importDefault(require("../booking/booking.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const booking_interface_1 = require("../booking/booking.interface");
const tutor_constant_1 = require("./tutor.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createTutor = (tutor) => __awaiter(void 0, void 0, void 0, function* () {
    const checkNumber = yield tutor_model_1.default.findOne({ phoneNumber: tutor.phoneNumber });
    const checkEmail = yield tutor_model_1.default.findOne({ email: tutor.email });
    const checkUserEmail = yield user_model_1.default.findOne({ email: tutor.email });
    if (checkEmail || checkUserEmail) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Already used this email!!!');
    }
    if (checkNumber) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Already used this phone number!!!');
    }
    const createdTutor = yield tutor_model_1.default.create(tutor);
    if (!createdTutor) {
        throw new ApiError_1.default(400, 'Failed to create tutor!');
    }
    const result = yield tutor_model_1.default.findById(createdTutor._id);
    return result;
});
const loginTutor = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isTutorExist = yield tutor_model_1.default.isUserExist(email);
    if (!isTutorExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'There is no tutor with this email.');
    }
    if (!(yield tutor_model_1.default.isPasswordMatch(password, isTutorExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect.');
    }
    const { role, id } = isTutorExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id, email, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ id, email, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const acceptBookingRequest = (tutor, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isBooking = yield booking_model_1.default.findOne({
        $and: [{ userId: userId }, { tutorId: tutor.id }],
    });
    if (!isBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking doesn't exist.");
    }
    if (isBooking.status !== 'processing') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking is in processing.');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield booking_model_1.default.findOneAndUpdate({ _id: isBooking.id }, { status: booking_interface_1.StatusOption.Accepted }, {
            session,
        });
        yield tutor_model_1.default.findOneAndUpdate({ _id: tutor.id }, {
            $inc: { unseenNotification: -1 },
        }, {
            session,
        });
        yield user_model_1.default.findOneAndUpdate({ _id: userId }, {
            $inc: { unseenNotification: 1 },
        }, {
            session,
        });
        yield tutor_model_1.default.findOneAndUpdate({
            $and: [{ _id: tutor.id }, { 'notification.userId': userId }],
        }, {
            $set: {
                'notification.$.status': booking_interface_1.StatusOption.Accepted,
            },
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
    return 'Booking accepted successfully.';
});
const cancelBookingRequest = (tutor, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isBooking = yield booking_model_1.default.findOne({
        $and: [{ userId: userId }, { tutorId: tutor.id }],
    });
    if (!isBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking doesn't exist.");
    }
    if (isBooking.status !== 'processing') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking is in processing.');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield booking_model_1.default.findOneAndUpdate({ _id: isBooking.id }, { status: booking_interface_1.StatusOption.Disapproved }, {
            session,
        });
        yield tutor_model_1.default.findOneAndUpdate({ _id: tutor.id }, {
            $inc: { unseenNotification: -1 },
            $pull: { notification: { userId: userId } },
        }, {
            session,
        });
        yield user_model_1.default.findOneAndUpdate({ _id: userId }, {
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
    return 'Booking Canceled successfully.';
});
const ownProfile = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutor_model_1.default.findById(userInfo.id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Your profile is not exist!!!');
    }
    return result;
});
const changePassword = (userInfo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield tutor_model_1.default.findById(userInfo.id).select({
        password: true,
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Tutor does not exist');
    }
    if (!(yield tutor_model_1.default.isPasswordMatch(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password is incorrect');
    }
    isUserExist.password = newPassword;
    isUserExist.save();
});
const getSingleTutor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutor_model_1.default.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Tutor is not exist!!!');
    }
    return result;
});
const getAllTutorsByUser = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, lowestExpectedSalary = 0, highestExpectedSalary = Infinity } = filters, filtersData = __rest(filters, ["searchTerm", "lowestExpectedSalary", "highestExpectedSalary"]);
    const andConditions = [];
    // for filter salary
    andConditions.push({
        $and: [
            { expectedMinSalary: { $gte: lowestExpectedSalary } },
            { expectedMinSalary: { $lte: highestExpectedSalary } },
        ],
    });
    // for filter data
    if (searchTerm) {
        andConditions.push({
            $or: tutor_constant_1.tutorFilterableField.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    // for exact match user and condition
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // if no condition is given
    const query = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield tutor_model_1.default.find(query)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({
        email: false,
        phoneNumber: false,
        role: false,
        notification: false,
        unseenNotification: false,
        history: false,
    });
    const count = yield tutor_model_1.default.countDocuments(query);
    return {
        meta: {
            page,
            limit,
            count,
        },
        data: result,
    };
});
const getSingleTutorByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutor_model_1.default.findById(id).select({
        email: false,
        phoneNumber: false,
        role: false,
        notification: false,
        unseenNotification: false,
        history: false,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Tutor is not exist!!!');
    }
    return result;
});
const getAllTutorsByAdmin = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, lowestExpectedSalary = 0, highestExpectedSalary = Infinity } = filters, filtersData = __rest(filters, ["searchTerm", "lowestExpectedSalary", "highestExpectedSalary"]);
    const andConditions = [];
    // for filter salary
    andConditions.push({
        $and: [
            { expectedMinSalary: { $gte: lowestExpectedSalary } },
            { expectedMinSalary: { $lte: highestExpectedSalary } },
        ],
    });
    // for filter data
    if (searchTerm) {
        andConditions.push({
            $or: tutor_constant_1.tutorFilterableField.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    // for exact match user and condition
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // if no condition is given
    const query = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield tutor_model_1.default.find(query)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({
        role: false,
        unseenNotification: false,
    });
    const count = yield tutor_model_1.default.countDocuments(query);
    return {
        meta: {
            page,
            limit,
            count,
        },
        data: result,
    };
});
const getSingleTutorByAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutor_model_1.default.findById(id).select({
        role: false,
        unseenNotification: false,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Tutor is not exist!!!');
    }
    return result;
});
const updateProfile = (id, payload, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = yield tutor_model_1.default.findById(id);
    if (!tutor) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Tutor is not exist!!!');
    }
    if (userInfo.role !== 'admin' &&
        userInfo.role !== 'admin_tutor' &&
        userInfo.role !== 'super_admin' &&
        id !== userInfo.id.toString()) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You can not update this profile!!!');
    }
    if (payload.phoneNumber) {
        const checkNumber = yield tutor_model_1.default.findOne({
            phoneNumber: payload.phoneNumber,
        });
        if (checkNumber) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Already used this phone number!!!');
        }
    }
    const result = yield tutor_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const reviewTutor = (tutorId, review, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = yield tutor_model_1.default.findById(tutorId);
    if (!tutor) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Tutor is not exist!!!');
    }
    const user = yield user_model_1.default.findById(userInfo.id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User is not exist!!!');
    }
    review.name = user.fullName;
    yield tutor_model_1.default.findOneAndUpdate({ _id: tutorId }, {
        $push: { reviews: review },
    });
});
exports.TutorService = {
    createTutor,
    loginTutor,
    getSingleTutor,
    getSingleTutorByUser,
    acceptBookingRequest,
    cancelBookingRequest,
    ownProfile,
    updateProfile,
    reviewTutor,
    getAllTutorsByUser,
    getAllTutorsByAdmin,
    getSingleTutorByAdmin,
    changePassword,
};
