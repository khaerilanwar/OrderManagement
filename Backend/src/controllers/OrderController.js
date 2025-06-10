import { createCustomerOrder, customerListOrders, editInvoice, editOrder, listOrders, orderDetail, payConfirmOrder, removeOrder, reportOrder } from "../services/OrderService.js"

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
        const { customerId, invoice, categoryId, orderName, orderDescription, productId } = req.body

        const response = await createCustomerOrder({ customerId, categoryId, orderName, orderDescription, invoice, productId })
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

export const downloadReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query
        const response = await reportOrder(startDate, endDate)
        if (!response.success) return res.status(response.statusCode).json(response)

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        res.setHeader(
            'Content-Disposition',
            'attachment; filename="report-30-last-days.xlsx"'
        )

        return res.send(response.data)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}