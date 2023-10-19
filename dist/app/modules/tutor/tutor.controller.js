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
exports.TutorController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const tutor_sevice_1 = require("./tutor.sevice");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const tutor_constants_1 = require("./tutor.constants");
const pagination_1 = require("../../../constants/pagination");
const createTutor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutor_sevice_1.TutorService.createTutor(req.body);
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Tutor created successfully",
        data: result,
    });
}));
const getTutors = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.query);
    const filters = (0, pick_1.default)(req.query, tutor_constants_1.tutorFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield tutor_sevice_1.TutorService.getTutors(filters, paginationOptions);
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Tutors retrived successfully",
        data: result,
    });
}));
const getSingleTutor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield tutor_sevice_1.TutorService.getSingleTutor((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Tutor retrived successfully",
        data: result,
    });
}));
const updateTutor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const result = yield tutor_sevice_1.TutorService.updateTutor((_b = req.params) === null || _b === void 0 ? void 0 : _b.id, req.body);
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Tutor updated successfully",
        data: result,
    });
}));
const deleteTutor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const result = yield tutor_sevice_1.TutorService.deleteTutor((_c = req.params) === null || _c === void 0 ? void 0 : _c.id);
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Tutor deleted successfully",
        data: result,
    });
}));
exports.TutorController = {
    createTutor,
    getTutors,
    getSingleTutor,
    deleteTutor,
    updateTutor,
};
