import express from "express";

import {
  getRegisterPage,
  postRegister,
} from "../controllers/register.controller.js";
import {
  isAccountExistMiddleware,
  isLoggedInMiddleware,
  isRightFormatMiddleware,
} from "../utils/middleware.js";

const router = express.Router();

router.get("/", isLoggedInMiddleware, getRegisterPage);

router.post(
  "/",
  isRightFormatMiddleware,
  isAccountExistMiddleware,
  postRegister
);

export default router;
