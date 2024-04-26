"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const feedback_validation_1 = require("./feedback.validation");
const feedback_controller_1 = require("./feedback.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR, user_1.ENUM_USER_ROLE.ADMIN_USER, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.TUTOR), (0, validateRequest_1.default)(feedback_validation_1.FeedbackValidation.createFeedbackZodSchema), feedback_controller_1.FeedbackController.createFeedback);
router.get('/', feedback_controller_1.FeedbackController.getAllFeedback);
exports.FeedbackRouters = router;
