/* import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = Router();

router.post(
  "/create-user",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);
router.post(
  "/login-user",
  validateRequest(UserValidation.loginUserZodSchema),
  UserController.loginUser
);
router.get("/", UserController.getAllUsers);
router.get("/users-count", UserController.totalUsers);
router.get("/profile", auth(), UserController.getProfile);
router.get("/:id", UserController.getSingleUser);
router.patch("/profile", auth(), UserController.updateProfile);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.SUPPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.updateSingleUser
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.SUPPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleUser
);

export const UserRoute = router; */
