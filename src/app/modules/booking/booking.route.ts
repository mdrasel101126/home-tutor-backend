import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// request for booking
router.post(
  '/',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.ADMIN_USER,
  ),
  validateRequest(BookingValidation.createBookingZodSchema),
  BookingController.bookTutor,
);

router.get(
  '/get-my-bookings',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.ADMIN_USER,
  ),
  BookingController.getOwnBookings,
);

router.get(
  '/all-booking',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.ADMIN_USER,
  ),
  BookingController.getAllBookings,
);

router.get(
  '/requested-booking',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
  ),
  BookingController.getAllRequestedBookings,
);

// process booking => send it to tutor from user
router.patch(
  '/process/:bookingId',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
  ),
  BookingController.processBooking,
);

// cancel booking by admin
router.delete(
  '/cancel-by-admin/:bookingId',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
  ),
  BookingController.cancelBookingByAdmin,
);

// cancel own booking
router.delete(
  '/cancel/:bookingId',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.ADMIN_USER,
  ),
  BookingController.cancelBooking,
);

// confirm own booking
router.patch(
  '/confirm/:bookingId',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.ADMIN_USER,
  ),
  BookingController.confirmBooking,
);

export const BookingRouters = router;
