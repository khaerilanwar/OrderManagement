import { createCategoryProduct, editProductCategory, getProductCategories, getProducts, removeProductCategory } from "../services/ProductService.js"

export const getAllProduct = async (req, res) => {
    try {
        const response = await getProducts()

        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, image } = req.body

        const response = await createCategoryProduct({ id, name, description, image })
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const getAllProductCategories = async (req, res) => {
    try {
        const response = await getProductCategories()
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const createNewProductCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        const response = await createCategoryProduct({ name, description })
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const updateProductCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description } = req.body

        const response = await editProductCategory(Number(id), { name, description })
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const deleteProductCategory = async (req, res) => {
    try {
        const { id } = req.params

        const response = await removeProductCategory(Number(id))
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}