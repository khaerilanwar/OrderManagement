import express from "express"
import categoryRoute from "./CategoryRoutes.js"
import authRoute from "./AuthRoutes.js"
import verifyToken from "../middleware/VerifyToken.js"
import orderRoute from "./OrderRoutes.js"
import statusRoute from "./StatusRoutes.js"
import customerRoute from "./CustomerRoutes.js"
import testimoniRoute from "./TestimoniRoutes.js"
import licenseRoute from "./LicenseRoutes.js"
import { getAllTestimoni } from "../controllers/TestimoniController.js"
import { getAllAdminProduct, getAllProduct } from "../controllers/ProductController.js"
import productRoute from "./ProductRoutes.js"
import { prisma } from "../config/Database.js"
import { testDokuSandbox } from "../controllers/PaymentController.js"

const router = express.Router()
router.get("/", (req, res) => {
    res.send("<h1>Welcome to API Server Order Management</h1> <h2> By Khaeril Anwar</h2>")
})

// Dashboard route
router.get("/dashboard", verifyToken, async (req, res) => {
    try {
        const totalOrders = await prisma.order.count()
        const totalCustomers = await prisma.customer.count()
        const totalTestimoni = await prisma.testimoni.count()
        const totalRevenue = await prisma.order.aggregate({
            _sum: {
                invoice: true
            },
            where: {
                status_id: 5
            }
        })

        const totalOrderThisMonth = await prisma.order.count({
            where: {
                created_at: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        })
        const totalCustomerThisMonth = await prisma.customer.count({
            where: {
                created_at: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        })
        const totalTestimoniThisMonth = await prisma.testimoni.count({
            where: {
                created_at: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        })
        const totalRevenueThisMonth = await prisma.order.aggregate({
            _sum: {
                invoice: true
            },
            where: {
                status_id: 5,
                created_at: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        })

        const recentOrders = await prisma.order.findMany({
            orderBy: {
                created_at: 'desc'
            },
            take: 5,
            include: {
                customer: true,
                category: true
            }
        })
        const groupSellingOrder = await prisma.order.groupBy({
            by: ['category_id'],
            _count: {
                id: true
            },
            orderBy: {
                _count: {
                    id: 'desc'
                }
            },
            take: 5
        })
        const bestSellingOrder = await Promise.all(
            groupSellingOrder.map(async (group) => {
                const category = await prisma.category.findUnique({
                    where: {
                        id: group.category_id
                    },
                    include: {
                        product_category: true
                    }
                })

                return { category, totalOrders: group._count.id }
            })
        )

        return res.status(200).json({
            success: true,
            message: "Dashboard data retrieved successfully",
            statusCode: 200,
            data: {
                totalOrders,
                totalCustomers,
                totalTestimoni,
                totalRevenue: totalRevenue._sum.invoice || 0,
                totalOrderThisMonth,
                totalCustomerThisMonth,
                totalTestimoniThisMonth,
                totalRevenueThisMonth: totalRevenueThisMonth._sum.invoice || 0,
                recentOrders,
                bestSellingOrder
            }
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
})

// Payment route
router.get("/cek-payment", testDokuSandbox)

// Utility routes
router.use("/auth", authRoute)
router.get("/testimoni", getAllTestimoni)
router.get("/product", getAllProduct)
router.get("/productadmin", verifyToken, getAllAdminProduct)
router.use("/product", verifyToken, productRoute) // Assuming you want to protect product routes as well
router.use("/category", verifyToken, categoryRoute)
router.use('/order', verifyToken, orderRoute)
router.use("/status", verifyToken, statusRoute)
router.use("/customer", verifyToken, customerRoute)
router.use("/testimoni", verifyToken, testimoniRoute)
router.use("/license", verifyToken, licenseRoute)

router.use((req, res) => {
    res.status(404).send("<h1>Your destination not found on the server</h1>")
})

export default router