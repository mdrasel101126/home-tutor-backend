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
exports.TutorController = void 0;
const tutor_service_1 = require("./tutor.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const tutor_constant_1 = require("./tutor.constant");
const constant_1 = require("../../../constant");
const createTutor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutor_service_1.TutorService.createTutor(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Tutor create Successfully',
    });
}));
const loginTutor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resultWithRefreshToken = yield tutor_service_1.TutorService.loginTutor(req.body);
    const { refreshToken } = resultWithRefreshToken, result = __rest(resultWithRefreshToken, ["refreshToken"]);
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tutor logged in successfully!',
        data: result,
    });
}));
const acceptBookingRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const tutor = req.user;
    const result = yield tutor_service_1.TutorService.acceptBookingRequest(tutor, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: result,
    });
}));
const cancelBookingRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const tutor = req.user;
    const result = yield tutor_service_1.TutorService.cancelBookingRequest(tutor, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: result,
    });
}));
const ownProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req === null || req === void 0 ? void 0 : req.user;
    const result = yield tutor_service_1.TutorService.ownProfile(userInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users retrieved Successfully',
        data: result,
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req === null || req === void 0 ? void 0 : req.user;
    const result = yield tutor_service_1.TutorService.changePassword(userInfo, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Password changed Successfully.',
        data: result,
    });
}));
const getSingleTutor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield tutor_service_1.TutorService.getSingleTutor(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tutor retrieved Successfully.',
        data: result,
    });
}));
const getSingleTutorByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield tutor_service_1.TutorService.getSingleTutorByUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tutor retrieved Successfully.',
        data: result,
    });
}));
const getAllTutorsByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, tutor_constant_1.tutorFilterableField);
    const paginationOptions = (0, pick_1.default)(req.query, constant_1.paginationFields);
    const result = yield tutor_service_1.TutorService.getAllTutorsByUser(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tutors retrieved Successfully.',
        data: result,
    });
}));
const getSingleTutorByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield tutor_service_1.TutorService.getSingleTutorByAdmin(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tutor retrieved Successfully.',
        data: result,
    });
}));
const getAllTutorsByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, tutor_constant_1.tutorFilterableField);
    const paginationOptions = (0, pick_1.default)(req.query, constant_1.paginationFields);
    const result = yield tutor_service_1.TutorService.getAllTutorsByAdmin(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tutors retrieved Successfully.',
        data: result,
    });
}));
const updateProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tutor = req.body;
    const userInfo = req.user;
    const result = yield tutor_service_1.TutorService.updateProfile(id, tutor, userInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tutor updated successfully',
        data: result,
    });
}));
const reviewTutor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorId = req.params.id;
    const review = req.body;
    const userInfo = req.user;
    const result = yield tutor_service_1.TutorService.reviewTutor(tutorId, review, userInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review post successfully.',
        data: result,
    });
}));
exports.TutorController = {
    createTutor,
    loginTutor,
    acceptBookingRequest,
    getSingleTutor,
    ownProfile,
    reviewTutor,
    getSingleTutorByUser,
    updateProfile,
    getAllTutorsByUser,
    getSingleTutorByAdmin,
    getAllTutorsByAdmin,
    changePassword,
    cancelBookingRequest,
};
