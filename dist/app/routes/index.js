"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const review_route_1 = require("../modules/review/review.route");
const tutor_routes_1 = require("../modules/tutor/tutor.routes");
const booking_route_1 = require("../modules/booking/booking.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoute,
    },
    {
        path: "/tutors",
        route: tutor_routes_1.TutorRoute,
    },
    {
        path: "/reviews",
        route: review_route_1.ReviewRoute,
    },
    {
        path: "/bookings",
        route: booking_route_1.BookingRoute,
    },
];
moduleRoutes.map((moduleRoute) => router.use(moduleRoute.path, moduleRoute.route));
exports.default = router;
