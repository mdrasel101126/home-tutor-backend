import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

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
router.get("/profile", auth(), UserController.getProfile);
router.get("/:id", UserController.getSingleUser);
router.patch("/profile", auth(), UserController.updateProfile);
router.patch("/:id", UserController.updateSingleUser);
router.delete("/:id", UserController.deleteSingleUser);

export const UserRoute = router;
