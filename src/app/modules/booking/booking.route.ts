import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-booking",
  validateRequest(BookingValidation.createBookingZodSchema),
  BookingController.createBooking
);
router.delete("/:id", auth(), BookingController.deleteBooking);
router.get("/", auth(), BookingController.getUserBookings);

export const BookingRoute = router;
