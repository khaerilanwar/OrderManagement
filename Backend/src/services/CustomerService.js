import { prisma } from "../config/Database.js"

export const customerRegistration = async (data) => {
    try {
        // cek email dan no hp
        const existCustomer = await prisma.customer.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { phone: data.phone }
                ]
            }
        })

        if (existCustomer) {
            return { success: false, statusCode: 400, message: "Email atau nomor telepon sudah terdaftar!" }
        }

        // buat customer baru
        await prisma.customer.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                whatsapp: data.whatsapp,
                address: data.address,
                telegram: data.telegram || '',
                created_at: new Date(),
                updated_at: new Date()
            }
        })

        return { success: true, statusCode: 201, message: "Registrasi berhasil! Silakan masuk." }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || 'Internal server error!' }
    }
}

export const getAllCustomers = async () => {
    try {
        const customers = await prisma.customer.findMany({
            orderBy: [{ created_at: "desc" }, { name: "asc" }],
            include: {
                orders: true
            }
        })

        return { success: true, statusCode: 200, message: "Daftar pelanggan berhasil diambil!", data: customers }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || 'Internal server error!' }
    }
}