import { prisma } from "../config/Database.js"

export const createTestimoni = async (orderId, customerId, data) => {
    try {
        // cek order dan customer
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { customer: true, testimoni: true }
        })

        // cek testimoni order
        if (!order)
            return { success: false, statusCode: 404, message: "Order tidak ditemukan!" }
        if (order.customer.id !== customerId)
            return { success: false, statusCode: 403, message: "Anda tidak berhak memberikan testimoni untuk order ini!" }
        if (order.testimoni)
            return { success: false, statusCode: 400, message: "Testimoni sudah diberikan untuk order ini!" }

        // buat testimoni baru
        await prisma.testimoni.create({
            data: {
                rating: data.rating,
                description: data.testimoni,
                status: false,
                order_id: orderId,
                customer_id: customerId
            }
        })

        return { success: true, statusCode: 201, message: "Testimoni berhasil dibuat!" }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || 'Internal server error!' }
    }
}

export const getTestimoni = async () => {
    try {
        const data = await prisma.testimoni.findMany({
            include: {
                customer: true
            }
        })

        return { success: true, statusCode: 200, message: "Berhasil mendapatkan testimoni!", data }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || 'Internal server error!' }
    }
}