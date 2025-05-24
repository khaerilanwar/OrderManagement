import { editInvoice, editOrder, listOrders, orderDetail } from "../services/OrderService.js"

export const getListOrders = async (req, res) => {
    try {
        const response = await listOrders()
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const getOrderDetail = async (req, res) => {
    try {
        const { id } = req.params
        const response = await orderDetail(id)
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const editDetailOrder = async (req, res) => {
    try {
        const { id } = req.params
        const { status, description } = req.body
        const response = await editOrder(id, { status, description })
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const editInvoiceOrder = async (req, res) => {
    try {
        const { id } = req.params
        const { invoice, downPayment } = req.body
        const response = await editInvoice(id, { invoice, downPayment })
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}