import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = Router();

router.post(
  "/create-booking",
  validateRequest(BookingValidation.createBookingZodSchema),
  BookingController.createBooking
);
router.get("/", BookingController.getUserBookings);

export const ReviewRoute = router;
