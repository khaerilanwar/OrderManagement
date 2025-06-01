import { createTestimoni, getTestimoni } from "../services/TestimoniService.js"

export const newTestimoniOrder = async (req, res) => {
    try {
        const { id } = req.params
        const { customerId, rating, testimoni } = req.body
        const response = await createTestimoni(id, customerId, { rating, testimoni })
        if (!response.success)
            return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const getAllTestimoni = async (req, res) => {
    try {
        const response = await getTestimoni()
        if (!response.success)
            return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}