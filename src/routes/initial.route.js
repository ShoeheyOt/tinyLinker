import express from "express";
import { getInitialPage } from "../controllers/initial.controller.js";
import { isLoggedInMiddleware } from "../utils/middleware.js";

const router = express.Router();

router.get("/", isLoggedInMiddleware, getInitialPage);

export default router;
