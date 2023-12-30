"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
// request for booking
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR, user_1.ENUM_USER_ROLE.ADMIN_USER), (0, validateRequest_1.default)(booking_validation_1.BookingValidation.createBookingZodSchema), booking_controller_1.BookingController.bookTutor);
router.get('/get-my-bookings', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR, user_1.ENUM_USER_ROLE.ADMIN_USER), booking_controller_1.BookingController.getOwnBookings);
router.get('/all-booking', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR, user_1.ENUM_USER_ROLE.ADMIN_USER), booking_controller_1.BookingController.getAllBookings);
router.get('/requested-booking', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR), booking_controller_1.BookingController.getAllRequestedBookings);
// process booking => send it to tutor from user
router.patch('/process/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR), booking_controller_1.BookingController.processBooking);
// cancel booking by admin
router.delete('/cancel-by-admin/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR), booking_controller_1.BookingController.cancelBookingByAdmin);
// cancel own booking
router.delete('/cancel/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR, user_1.ENUM_USER_ROLE.ADMIN_USER), booking_controller_1.BookingController.cancelBooking);
// confirm own booking
router.patch('/confirm/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR, user_1.ENUM_USER_ROLE.ADMIN_USER), booking_controller_1.BookingController.confirmBooking);
exports.BookingRouters = router;
