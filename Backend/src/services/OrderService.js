import { prisma } from '../config/Database.js'
import { OrderDTO } from '../DTOs/OrderDTO.js'

export const listOrders = async () => {
    try {
        const data = (await prisma.order.findMany({
            orderBy: [{ created_at: "desc" }, { title: "asc" }],
            include: {
                customer: true,
                category: true,
                status: true
            }
        })).map((item) => new OrderDTO(item))

        return { success: true, statusCode: 200, data };
    }
    catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}

export const orderDetail = async (id) => {
    try {
        const data = await prisma.order.findUnique({
            where: { id },
            include: {
                customer: true,
                category: true,
                status: true
            }
        })

        if (!data) return { success: false, statusCode: 404, message: "Order not found!" }

        return { success: true, statusCode: 200, data }
    }
    catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}

export const editOrder = async (id, data) => {
    try {
        const order = await prisma.order.findUnique({ where: { id } })

        if (!order) return { success: false, statusCode: 404, message: "Order not found!" }

        await prisma.order.update({
            where: { id },
            data: {
                status_id: data.status,
                description: data.description
            }
        })

        return { success: true, statusCode: 200, message: "Order updated successfully!" }
    } catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}

export const editInvoice = async (id, data) => {
    try {
        const order = await prisma.order.findUnique({ where: { id } })

        if (!order) return { success: false, statusCode: 404, message: "Order not found!" }

        await prisma.order.update({
            where: { id },
            data: {
                invoice: data.invoice,
                down_payment: {
                    increment: data.downPayment
                }
            }
        })

        return { success: true, statusCode: 200, message: "Invoice updated successfully!" }
    } catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}