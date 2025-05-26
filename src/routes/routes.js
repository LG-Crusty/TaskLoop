import {Router} from "express";
import { signupUser, loginUser } from "../controllers/userController.js";
import zodMiddleware from "../middlewares/zod.middleware.js";

const router = Router();

router.route("/signup").post(zodMiddleware, signupUser)
router.route("/login").post(zodMiddleware, loginUser)


export default router;
