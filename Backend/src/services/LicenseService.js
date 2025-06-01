import crypto from 'crypto'
import { prisma } from '../config/Database.js';

export const createTokenLicense = async (data) => {
    try {
        const token = crypto.randomBytes(32).toString('hex');

        await prisma.license.create({
            data: {
                token: data.token || token,
                name: data.name,
                description: data.description,
                customer_id: data.customerId,
                usage_limit: data.limit,
                used_count: 0,
                expire_date: data.expire,
                created_at: new Date(),
                updated_at: new Date()
            }
        })

        return { success: true, statusCode: 201, message: 'License token created successfully!', data: { token } }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || 'Internal server error!' }
    }
}

export const getAllTokenLicenses = async () => {
    try {
        const data = await prisma.license.findMany({
            orderBy: [{ updated_at: 'desc' }, { name: 'asc' }],
            include: {
                customer: true
            }
        })

        return { success: true, statusCode: 200, message: 'License tokens retrieved successfully!', data }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || 'Internal server error!' }
    }
}

export const changeTokenLicense = async (id, data) => {
    try {
        const existLicense = await prisma.license.findUnique({
            where: { id }
        })
        if (!existLicense)
            return { success: false, statusCode: 404, message: 'License token not found!' }

        await prisma.license.update({
            where: { id },
            data: {
                expire_date: data.expire,
                usage_limit: {
                    increment: data.limit || 0
                }
            }
        })

        return { success: true, statusCode: 200, message: 'License token updated successfully!' }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || 'Internal server error!' }
    }
}