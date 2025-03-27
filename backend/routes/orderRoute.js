import express from 'express'
import { getAllOrders, placeOrder, updateStatus, usersOrders, verifyOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router()

router.post("/place",authMiddleware,placeOrder)
router.post("/verify",verifyOrder)
router.get("/userOrders",authMiddleware,usersOrders)
router.get("/allOrders",getAllOrders)
router.post("/status",updateStatus)


export default router;