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
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const review_model_1 = require("./review.model");
const user_model_1 = require("../user/user.model");
const tutor_model_1 = require("../tutor/tutor.model");
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, tutor } = payload;
    const isTutorExist = yield tutor_model_1.Tutor.isTutorExist(tutor.toString());
    if (!isTutorExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Tutor is not found!");
    }
    const isUserExist = yield user_model_1.User.isUserExist(user.toString());
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User is not found!");
    }
    const result = yield review_model_1.Review.create(payload);
    return result;
});
const getUserReviews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({ user: id });
    return result;
});
exports.ReviewService = {
    createReview,
    getUserReviews,
};
