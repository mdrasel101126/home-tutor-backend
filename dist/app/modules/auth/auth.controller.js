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
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const auth_sevice_1 = require("./auth.sevice");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
/* const getProfile = catchAsync(async (req: Request, res: Response) => {
  if (req.user?.role === "tutor") {
    const result = await AuthService.getTutorProfile(req.user?._id);
    return sendResponse<ITutor>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tutor profile retrived successfully",
      data: result,
    });
  } else {
    const result = await AuthService.getUserProfile(req.user?._id);
    return sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile retrived successfully",
      data: result,
    });
  }
}); */
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_sevice_1.AuthService.loginUser(req.body);
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User log in successfully",
        data: result,
    });
}));
exports.AuthController = {
    loginUser,
};
