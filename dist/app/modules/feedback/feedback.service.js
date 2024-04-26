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
exports.FeedbackService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const feedback_model_1 = __importDefault(require("./feedback.model"));
const tutor_model_1 = __importDefault(require("../tutor/tutor.model"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createFeedback = (feedback, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    if (userInfo.role === 'tutor') {
        const tutor = yield tutor_model_1.default.findById(userInfo.id);
        if (!tutor) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Tutor is not exist!!!');
        }
        feedback.name = tutor.fullName;
        feedback.role = 'Tutor';
    }
    else {
        const user = yield user_model_1.default.findById(userInfo.id);
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User is not exist!!!');
        }
        feedback.name = user.fullName;
        feedback.role = 'Public';
    }
    const result = yield feedback_model_1.default.create(feedback);
    return result;
});
const getAllFeedback = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield feedback_model_1.default.find().sort(sortConditions);
    const count = yield feedback_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            count,
        },
        data: result,
    };
});
exports.FeedbackService = {
    createFeedback,
    getAllFeedback,
};
