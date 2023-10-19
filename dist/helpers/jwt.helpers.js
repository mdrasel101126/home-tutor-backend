"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, sectret, expireTime) => {
    return jsonwebtoken_1.default.sign(payload, sectret, {
        expiresIn: expireTime,
    });
};
const verifyToken = (token, sectret) => {
    return jsonwebtoken_1.default.verify(token, sectret);
};
exports.jwtHelpers = {
    createToken,
    verifyToken,
};
