import express from "express";
import { createUrl } from "../controllers/url.controllers";
import { deleteUrl } from "../controllers/url.controllers";
import { getUrl } from "../controllers/url.controllers";
import { updateShortUrl } from "../controllers/url.controllers";
const router = express.Router();

router.post("/create-url", createUrl);
router.put("/update-url-code", updateShortUrl);
router.get("/get-url", getUrl);
router.delete("/delete-url", deleteUrl);

export default router;
