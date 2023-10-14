import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { ReviewRoute } from "../modules/review/review.route";
import { TutorRoute } from "../modules/tutor/tutor.routes";

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
];
moduleRoutes.map((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route)
);

export default router;
