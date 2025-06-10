import { customerRegistration, getAllCustomers, getCustomerById } from "../services/CustomerService.js";

export const customerRegister = async (req, res) => {
    try {
        const { name, email, phone, address, hasWhatsapp } = req.body;
        const newCustomer = {
            name,
            email: email.toLowerCase(),
            phone,
            address,
            whatsapp: hasWhatsapp ? phone : null,
        }

        const response = await customerRegistration(newCustomer)
        if (!response.success) return res.status(response.statusCode).json(response);

        return res.status(response.statusCode).json(response);
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const getCustomers = async (req, res) => {
    try {
        const response = await getAllCustomers();
        if (!response.success) return res.status(response.statusCode).json(response);

        return res.status(response.statusCode).json(response);
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const getCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getCustomerById(id);
        if (!response.success) return res.status(response.statusCode).json(response);

        return res.status(response.statusCode).json(response);
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}