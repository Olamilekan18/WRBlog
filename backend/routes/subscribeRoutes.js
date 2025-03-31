import express from "express"
import { subscribeController } from "../controllers/subscribeController.js";

const router = express.Router()

router.post('/', subscribeController )

export default router;