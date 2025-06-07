import { createCustomerOrder, customerListOrders, editInvoice, editOrder, listOrders, orderDetail, payConfirmOrder, removeOrder } from "../services/OrderService.js"

// admin
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
        const { status, description, statusNotes } = req.body
        const response = await editOrder(id, { status, description, statusNotes })
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

// public customer
export const getListOrderCustomer = async (req, res) => {
    try {
        const { customerId } = req.params
        const response = await customerListOrders(customerId)
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const createOrderCustomer = async (req, res) => {
    try {
        const { customerId, categoryId, orderName, orderDescription } = req.body

        const response = await createCustomerOrder({ customerId, categoryId, orderName, orderDescription })
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params
        const response = await removeOrder(id)
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const payConfirmation = async (req, res) => {
    try {
        const { id } = req.params

        const response = await payConfirmOrder(id)
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}