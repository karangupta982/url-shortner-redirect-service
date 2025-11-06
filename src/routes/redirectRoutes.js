import express from "express";
import { redirectToLongUrl } from "../controllers/redirectController.js";

const router = express.Router();

router.get("/:shortId", redirectToLongUrl);

export default router;
