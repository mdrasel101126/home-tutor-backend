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
exports.UserService = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwt_helpers_1 = require("../../../helpers/jwt.helpers");
const user_model_1 = require("./user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({});
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id });
    return result;
});
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.create(payload);
    const accessToken = jwt_helpers_1.jwtHelpers.createToken({ email: user.email, _id: user._id, role: user === null || user === void 0 ? void 0 : user.role }, config_1.default.jwt.sectret, config_1.default.jwt.expires_in);
    return { user, accessToken };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email }).select("+password");
    console.log(user);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid password!");
    }
    const accessToken = jwt_helpers_1.jwtHelpers.createToken({ email: user === null || user === void 0 ? void 0 : user.email, _id: user === null || user === void 0 ? void 0 : user._id, role: user === null || user === void 0 ? void 0 : user.role }, config_1.default.jwt.sectret, config_1.default.jwt.expires_in);
    return { accessToken, user: user };
});
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return isUserExist;
});
const updateSingleUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User id not found!");
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updatedData = userData;
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).map((key) => {
            const nameKey = `name.${key}`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            updatedData[nameKey] = name[key];
        });
    }
    const result = yield user_model_1.User.findByIdAndUpdate(id, updatedData, {
        new: true,
    });
    return result;
});
const updateProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload, userData = __rest(payload, ["name"]);
    if (userData.role) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User role can not be changed!");
    }
    const isExist = yield user_model_1.User.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User id not found!");
    }
    const updatedData = userData;
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).map((key) => {
            const nameKey = `name.${key}`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            updatedData[nameKey] = name[key];
        });
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    return result;
});
exports.UserService = {
    createUser,
    loginUser,
    getProfile,
    updateSingleUser,
    updateProfile,
    deleteSingleUser,
    getAllUsers,
    getSingleUser,
};
