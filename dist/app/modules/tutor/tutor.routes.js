"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const tutor_validation_1 = require("./tutor.validation");
const tutor_controller_1 = require("./tutor.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = (0, express_1.Router)();
router.post("/create-tutor", (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(tutor_validation_1.TutorValidation.createTutorZodSchema), tutor_controller_1.TutorController.createTutor);
//router.patch("/:id";
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), tutor_controller_1.TutorController.deleteTutor);
router.get("/", tutor_controller_1.TutorController.getTutors);
router.get("/:id", tutor_controller_1.TutorController.getSingleTutor);
exports.TutorRoute = router;