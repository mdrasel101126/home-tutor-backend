import { Router } from "express";
import auth from "../../middlewares/auth";
import { AuthController } from "./auth.controller";

const router = Router();

router.get("/profile", auth(), AuthController.getProfile);

export const AuthRoute = router;
