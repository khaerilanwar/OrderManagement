import { prisma } from '../config/Database.js'
import { OrderDTO } from '../DTOs/OrderDTO.js'
import moment from 'moment'

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
                status: true,
                TimelineStatus: {
                    include: {
                        status: true
                    },
                    orderBy: {
                        sequence: 'asc'
                    }
                }
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

        // cek jik staus berubah
        if (data.status != order.status_id) {
            const status = await prisma.status.findUnique({ where: { id: data.status } })
            const maxTimeline = await prisma.timelineStatus.aggregate({ _max: { sequence: true }, where: { order_id: id } })
            if (!status) return { success: false, statusCode: 404, message: "Status not found!" }

            // update status dan deskripsi
            await prisma.order.update({
                where: { id },
                data: {
                    status_id: data.status,
                    description: data.description
                }
            })

            // nambah timeline status
            await prisma.timelineStatus.create({
                data: {
                    sequence: maxTimeline._max.sequence ? maxTimeline._max.sequence + 1 : 1,
                    status_id: status.id,
                    description: data.statusNotes || status.description,
                    order_id: order.id,
                }
            })
        }
        else {
            // update deskripsi doang
            await prisma.order.update({
                where: { id },
                data: { description: data.description }
            })
        }


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

export const removeOrder = async (id) => {
    try {
        const order = await prisma.order.findUnique({ where: { id } })

        if (!order) return { success: false, statusCode: 404, message: "Order not found!" }
        if (order.status_id > 3) return { success: false, statusCode: 400, message: "Cannot delete order with status 'In Process' or higher!" }

        await prisma.order.delete({ where: { id } })

        return { success: true, statusCode: 200, message: "Order deleted successfully!" }
    }
    catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}

// public customer
export const customerListOrders = async (customerId) => {
    try {
        const data = await prisma.order.findMany({
            where: { customer_id: customerId },
            orderBy: [{ id: "desc" }, { created_at: "desc" }, { title: "asc" }],
            include: {
                category: true,
                status: true,
                testimoni: true
            }
        }).then((items) => items.map((item) => ({
            id: item.id,
            title: item.title,
            invoice: item.invoice,
            status: item.status.name,
            rating: item.testimoni !== null ? item.testimoni.rating : 0,
            category: item.category.name,
            createdAt: item.created_at
        })))

        if (!data || data.length === 0) return { success: false, statusCode: 404, message: "No orders found for this customer!" }

        return { success: true, statusCode: 200, message: "Orders retrieved successfully!", data };
    }
    catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}

export const createCustomerOrder = async (orderData) => {
    try {
        const { orderName, orderDescription, customerId, categoryId } = orderData;

        // Check if customer exists
        const customer = await prisma.customer.findUnique({ where: { id: customerId } });
        if (!customer) return { success: false, statusCode: 404, message: "Customer not found!" };

        // Check if category exists
        const category = await prisma.category.findUnique({ where: { id: categoryId } });
        if (!category) return { success: false, statusCode: 404, message: "Category not found!" };

        const maxOrder = Number(
            (await prisma.order.aggregate({ _max: { id: true } }))._max.id.slice(-4)
        );
        const newOrderId = moment().format("YYYYMM") + (maxOrder + 1).toString().padStart(4, '0')

        // Create new order
        const newOrder = await prisma.order.create({
            data: {
                id: newOrderId,
                title: orderName,
                description: orderDescription,
                invoice: 0,
                customer_id: customerId,
                category_id: categoryId,
                status_id: 1,
                created_at: new Date(),
                updated_at: new Date()
            }
        })

        // Create initial timeline status
        const status = await prisma.status.findUnique({ where: { id: 1 } });
        await prisma.timelineStatus.create({
            data: {
                sequence: 1,
                status_id: 1, // Assuming 1 is the initial status
                description: status.description || "Order created",
                order_id: newOrder.id,
            }
        });

        return { success: true, statusCode: 201, message: "Order created successfully!", data: newOrder };
    }
    catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}

export const payConfirmOrder = async (orderId) => {
    try {
        const order = await prisma.order.findUnique({ where: { id: orderId } });

        if (!order) return { success: false, statusCode: 404, message: "Order not found!" };

        const maxTimeline = await prisma.timelineStatus.aggregate({ _max: { sequence: true }, where: { order_id: orderId } })
        await prisma.order.update({
            where: { id: orderId },
            data: {
                status_id: 3
            }
        })

        await prisma.timelineStatus.create({
            data: {
                sequence: maxTimeline._max.sequence ? maxTimeline._max.sequence + 1 : 1,
                status_id: 3,
                order_id: order.id,
            }
        })

        return { success: true, statusCode: 200, message: "Order payment confirmed successfully!" }
    }
    catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}

export const reportLast30Days = async () => {
    try {
        const data = await prisma.order.findMany({
            where: {
                status_id: 5,
                completed_at: {
                    gte: moment().subtract(30, 'days').toDate(),
                    lte: new Date()
                }
            },
            include: {
                category: true
            }
        })

        if (!data || data.length === 0) return { success: false, statusCode: 404, message: "No completed orders found in the last 30 days." }

        return { success: true, statusCode: 200, message: "Completed orders in the last 30 days retrieved successfully.", data }
    }
    catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}

export const reportRangeFilter = async (startDate, endDate) => {
    try {

    }
    catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}