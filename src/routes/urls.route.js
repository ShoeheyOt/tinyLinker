import express from "express";
import {
  deleteUrl,
  getCreateNewUrl,
  getDynamicUrl,
  getMyUrls,
  postCreateNewUrl,
  postDynamicUrl,
} from "../controllers/urls.controller.js";
import { isLoggedInMiddleware } from "../utils/middleware.js";

const router = express.Router();

router.get("/", isLoggedInMiddleware, getMyUrls);

router.get("/new", isLoggedInMiddleware, getCreateNewUrl);

router.post("/new", isLoggedInMiddleware, postCreateNewUrl);

router.get("/:id", isLoggedInMiddleware, getDynamicUrl);

router.post("/:id", isLoggedInMiddleware, postDynamicUrl);

router.post("/:id/delete", isLoggedInMiddleware, deleteUrl);

export default router;
