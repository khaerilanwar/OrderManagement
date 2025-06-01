import { allCategories, createNewCategory, removeCategory, updateCategory } from "../services/CategoryService.js";

export const getAllCategories = async (req, res) => {
    try {
        const response = await allCategories()

        return res.status(response.statusCode).json(response)
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const postNewCategory = async (req, res) => {
    try {
        const { name, description, productCategoryId } = req.body

        const response = await createNewCategory(name, description, productCategoryId)
        if (!response.success) return res.status(response.statusCode).json({ message: response.message })

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const putUpdateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description } = req.body

        const response = await updateCategory(id, { name, description })
        if (!response.success) {
            return res.status(response.statusCode).json({ message: response.message })
        }

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        const response = await removeCategory(id)
        if (!response.success) return res.status(response.statusCode).json({ message: response.message })

        return res.status(response.statusCode).json(response)
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error." })
    }
}
