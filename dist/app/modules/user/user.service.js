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
exports.UserService = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwt_helpers_1 = require("../../../helpers/jwt.helpers");
const user_model_1 = require("./user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const customer_model_1 = require("../customer/customer.model");
const admin_model_1 = require("../admin/admin.model");
const tutor_model_1 = require("../tutor/tutor.model");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({});
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id });
    return result;
});
/* const createUser = async (payload: IUser): Promise<IUserCreateResponse> => {
  const user = await User.create(payload);
  const accessToken = jwtHelpers.createToken(
    { email: user.email, _id: user._id, role: user?.role },
    config.jwt.sectret as Secret,
    config.jwt.expires_in as string
  );
  return { user, accessToken };
}; */
const createCustomer = (customer, user) => __awaiter(void 0, void 0, void 0, function* () {
    user.role = "customer";
    let newUserData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newCustomer = yield customer_model_1.Customer.create([customer], { session });
        if (!newCustomer.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create Customer");
        }
        user.customer = newCustomer[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
        }
        newUserData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserData) {
        newUserData = yield user_model_1.User.findById(newUserData._id).populate("customer");
    }
    const accessToken = jwt_helpers_1.jwtHelpers.createToken({
        email: newUserData === null || newUserData === void 0 ? void 0 : newUserData.email,
        _id: newUserData === null || newUserData === void 0 ? void 0 : newUserData._id,
        role: newUserData === null || newUserData === void 0 ? void 0 : newUserData.role,
    }, config_1.default.jwt.sectret, config_1.default.jwt.expires_in);
    return { newUserData, accessToken };
});
const createAdmin = (admin, user) => __awaiter(void 0, void 0, void 0, function* () {
    user.role = "admin";
    let newUserData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newAdmin = yield admin_model_1.Admin.create([admin], { session });
        if (!newAdmin.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create admin");
        }
        user.admin = newAdmin[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
        }
        newUserData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserData) {
        newUserData = yield user_model_1.User.findById(newUserData._id).populate("admin");
    }
    return { newUserData };
});
const createTutor = (tutor, user) => __awaiter(void 0, void 0, void 0, function* () {
    user.role = "tutor";
    let newUserData = null;
    //console.log({ tutor, user });
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newTutor = yield tutor_model_1.Tutor.create([tutor], { session });
        if (!newTutor.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create tutor");
        }
        user.tutor = newTutor[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
        }
        newUserData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserData) {
        newUserData = yield user_model_1.User.findById(newUserData._id).populate("tutor");
    }
    const accessToken = jwt_helpers_1.jwtHelpers.createToken({
        email: newUserData === null || newUserData === void 0 ? void 0 : newUserData.email,
        _id: newUserData === null || newUserData === void 0 ? void 0 : newUserData._id,
        role: newUserData === null || newUserData === void 0 ? void 0 : newUserData.role,
    }, config_1.default.jwt.sectret, config_1.default.jwt.expires_in);
    return { newUserData, accessToken };
});
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return isUserExist;
});
/* const updateSingleUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User id not found!");
  }

  const { name, ...userData } = payload;

  const updatedData: Partial<IUser> = userData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).map((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return result;
};
 */
/* const updateProfile = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const { name, ...userData } = payload;

  if (userData.role) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User role can not be changed!");
  }
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User id not found!");
  }

  const updatedData: Partial<IUser> = userData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).map((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
}; */
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    return result;
});
const totalUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().count();
    return result;
});
exports.UserService = {
    //createUser,
    //loginUser,
    getProfile,
    /* updateSingleUser,
    updateProfile, */
    deleteSingleUser,
    getAllUsers,
    getSingleUser,
    totalUsers,
    createCustomer,
    createAdmin,
    createTutor,
};
