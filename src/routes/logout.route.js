import express from "express";
import { postLogout } from "../controllers/logout.controller.js";

const router = express.Router();

router.post("/", postLogout);

export default router;
