import { changeProductStatus, createCategoryProduct, createProduct, editProduct, editProductCategory, getAdminProducts, getProductCategories, getProducts, productCategoriesCustomer, removeProduct, removeProductCategory, softRemoveProduct } from "../services/ProductService.js"

export const createNewProduct = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Image is required." })

        const { name, description, categoryId, price } = req.body
        const cloudAssetPath = req.file.path
        const cloudPublicId = req.file.filename
        const response = await createProduct({
            name, price: Number(price), description, image: cloudAssetPath, cloudPublicId, categoryId: Number(categoryId)
        })
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const getAllAdminProduct = async (req, res) => {
    try {
        const response = await getAdminProducts()
        if (!response.success) return res.status(response.statusCode).json(response)
        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

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
        const { name, price, description } = req.body
        const cloudAssetPath = req.file ? req.file.path : null
        const cloudPublicId = req.file ? req.file.filename : null

        const response = await editProduct(id, { name, price: Number(price), description, image: cloudAssetPath, cloudPublicId })
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const softDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const response = await softRemoveProduct(id)
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const response = await removeProduct(id)
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const updateProductStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { isActive } = req.body

        const response = await changeProductStatus(id, isActive)
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

export const getProductCategoriesCustomer = async (req, res) => {
    try {
        const response = await productCategoriesCustomer()
        if (!response.success) return res.status(response.statusCode).json(response)

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}