import { changeTokenLicense, createTokenLicense, getAllTokenLicenses } from "../services/LicenseService.js"

export const newTokenLicense = async (req, res) => {
    try {
        const { name, description, customerId, limit, expire } = req.body

        const response = await createTokenLicense({
            name,
            description,
            customerId,
            limit,
            expire
        })
        if (!response.success)
            return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const getAllTokenLicense = async (req, res) => {
    try {
        const response = await getAllTokenLicenses()

        if (!response.success)
            return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const changeLimitLicense = async (req, res) => {
    try {
        const { id } = req.params
        const { expire, limit } = req.body

        const response = await changeTokenLicense(id, { expire, limit })

        if (!response.success)
            return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}