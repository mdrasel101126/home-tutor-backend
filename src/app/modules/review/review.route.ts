import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidation } from "./review.validation";
import { ReviewController } from "./review.controller";

const router = Router();

router.post(
  "/create-review",
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview
);
router.get("/", ReviewController.getUserReviews);

export const ReviewRoute = router;
