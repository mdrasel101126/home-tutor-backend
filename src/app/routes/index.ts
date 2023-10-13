import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { BookRoute } from "../modules/book/book.route";
import { ReviewRoute } from "../modules/review/review.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoute,
  },
  {
    path: "/books",
    route: BookRoute,
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
