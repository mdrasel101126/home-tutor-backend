import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { ReviewRoute } from "../modules/review/review.route";
import { TutorRoute } from "../modules/tutor/tutor.routes";
import { BookingRoute } from "../modules/booking/booking.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoute,
  },
  {
    path: "/tutors",
    route: TutorRoute,
  },
  {
    path: "/reviews",
    route: ReviewRoute,
  },
  {
    path: "/bookings",
    route: BookingRoute,
  },
];
moduleRoutes.map((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route)
);

export default router;
