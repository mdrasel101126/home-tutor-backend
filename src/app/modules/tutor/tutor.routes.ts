import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TutorValidation } from "./tutor.validation";
import { TutorController } from "./tutor.controller";

const router = Router();

router.post(
  "/create-tutor",
  validateRequest(TutorValidation.createTutorZodSchema),
  TutorController.createTutor
);
//router.patch("/:id";
//router.delete("/:id", BookController.deleteBook);
router.get("/", TutorController.getTutors);
router.get("/:id", TutorController.getSingleTutor);

export const TutorRoute = router;
