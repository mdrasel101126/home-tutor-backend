import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TutorValidation } from "./tutor.validation";
import { TutorController } from "./tutor.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = Router();

router.post(
  "/create-tutor",
  auth(ENUM_USER_ROLE.SUPPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(TutorValidation.createTutorZodSchema),
  TutorController.createTutor
);
//router.patch("/:id";
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.SUPPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TutorController.deleteTutor
);
router.get("/", TutorController.getTutors);
router.get("/:id", TutorController.getSingleTutor);

export const TutorRoute = router;
