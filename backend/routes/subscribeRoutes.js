import express from "express"
import { subscribeController, getAllSubscribers } from "../controllers/subscribeController.js";
const router = express.Router()
router.post('/', subscribeController )
router.get('/', getAllSubscribers)
export default router;