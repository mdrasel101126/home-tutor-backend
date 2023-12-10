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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const jwt_helpers_1 = require("../../../helpers/jwt.helpers");
const config_1 = __importDefault(require("../../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email }).select("+password");
    //console.log(user);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid password!");
    }
    const accessToken = jwt_helpers_1.jwtHelpers.createToken({ email: user === null || user === void 0 ? void 0 : user.email, _id: user === null || user === void 0 ? void 0 : user._id, role: user === null || user === void 0 ? void 0 : user.role }, config_1.default.jwt.sectret, config_1.default.jwt.expires_in);
    return { newUserData: user, accessToken };
});
exports.AuthService = {
    loginUser,
};
