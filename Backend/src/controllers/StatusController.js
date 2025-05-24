import { getAllStatus } from "../services/StatusService.js"

export const getStatus = async (req, res) => {
    try {
        const response = await getAllStatus()
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}