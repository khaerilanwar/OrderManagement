import express from "express"
import categoryRoute from "./CategoryRoutes.js"
import authRoute from "./AuthRoutes.js"
import verifyToken from "../middleware/VerifyToken.js"
import orderRoute from "./OrderRoutes.js"
import statusRoute from "./StatusRoutes.js"

const router = express.Router()
router.get("/", (req, res) => {
    res.send("<h1>Welcome to API Server Order Management</h1> <h2> By Khaeril Anwar</h2>")
})

router.use("/auth", authRoute)
router.use("/category", verifyToken, categoryRoute)
router.use('/order', verifyToken, orderRoute)
router.use("/status", verifyToken, statusRoute)

router.use((req, res) => {
    res.status(404).send("<h1>Your destination not found on the server</h1>")
})

export default router