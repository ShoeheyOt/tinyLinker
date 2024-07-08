import express from "express";

import { getLoginPage, postLogin } from "../controllers/login.controller.js";
import {
  isAccountExistMiddleware,
  isLoggedInMiddleware,
  isRightFormatMiddleware,
} from "../utils/middleware.js";

const router = express.Router();

router.get("/", isLoggedInMiddleware, getLoginPage);

router.post("/", isRightFormatMiddleware, isAccountExistMiddleware, postLogin);

export default router;
