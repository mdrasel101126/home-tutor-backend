"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRouters = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const tutor_route_1 = require("../modules/tutor/tutor.route");
const booking_route_1 = require("../modules/booking/booking.route");
const feedback_route_1 = require("../modules/feedback/feedback.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.UserRouters,
    },
    {
        path: '/tutor',
        route: tutor_route_1.TutorRouters,
    },
    {
        path: '/booking',
        route: booking_route_1.BookingRouters,
    },
    {
        path: '/feedback',
        route: feedback_route_1.FeedbackRouters,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.ApplicationRouters = router;
