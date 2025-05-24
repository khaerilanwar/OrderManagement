import { prisma } from "../config/Database.js"

export const getAllStatus = async () => {
    try {
        const data = await prisma.status.findMany({ orderBy: { sequence: 'asc' } })

        return { success: true, statusCode: 200, message: 'Successfully get all status!', data }
    } catch (err) {
        return { success: false, statusCode: 500, message: err.message || 'Internal server error!' }
    }
}