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
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const tutor_constants_1 = require("./tutor.constants");
const tutor_model_1 = require("./tutor.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const review_model_1 = require("../review/review.model");
const createTutor = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutor_model_1.Tutor.create(payload);
    return result;
});
const getTutors = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const andCoditions = [];
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    if (searchTerm) {
        andCoditions.push({
            $or: tutor_constants_1.tutorSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCoditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: {
                    $regex: value,
                    $options: "i",
                },
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andCoditions.length > 0 ? { $and: andCoditions } : {};
    const result = yield tutor_model_1.Tutor.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield tutor_model_1.Tutor.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleTutor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookExist = yield tutor_model_1.Tutor.isTutorExist(id);
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Tutor not found");
    }
    const reviws = yield review_model_1.Review.find({ tutor: id }).populate("user");
    return {
        tutor: isBookExist,
        reviews: reviws,
    };
});
const updateTutor = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield tutor_model_1.Tutor.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Tutor id not found!");
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
    const result = yield tutor_model_1.Tutor.findByIdAndUpdate(id, updatedData, {
        new: true,
    });
    return result;
});
const deleteTutor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isTutorExist = yield tutor_model_1.Tutor.isTutorExist(id);
    if (!isTutorExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Tutor not found");
    }
    const result = yield tutor_model_1.Tutor.findByIdAndDelete(id);
    yield review_model_1.Review.deleteMany({ tutor: id });
    return result;
});
exports.TutorService = {
    createTutor,
    getTutors,
    getSingleTutor,
    deleteTutor,
    updateTutor,
};
