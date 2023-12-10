"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = (0, express_1.Router)();
/* router.post(
  "/create-user",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
); */
router.post("/create-customer", (0, validateRequest_1.default)(user_validation_1.UserValidation.createCustomerZodSchema), user_controller_1.UserController.createCustomer);
router.post("/create-admin", (0, validateRequest_1.default)(user_validation_1.UserValidation.createAdminZodSchema), user_controller_1.UserController.createAdmin);
router.post("/create-tutor", (0, validateRequest_1.default)(user_validation_1.UserValidation.createTutorZodSchema), user_controller_1.UserController.createTutor);
/* router.post(
  "/login-user",
  validateRequest(UserValidation.loginUserZodSchema),
  UserController.loginUser
); */
router.get("/", user_controller_1.UserController.getAllUsers);
router.get("/users-count", user_controller_1.UserController.totalUsers);
router.get("/profile", (0, auth_1.default)(), user_controller_1.UserController.getProfile);
router.get("/:id", user_controller_1.UserController.getSingleUser);
//router.patch("/profile", auth(), UserController.updateProfile);
/* router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.SUPPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.updateSingleUser
); */
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.deleteSingleUser);
exports.UserRoute = router;
