import { fileURLToPath } from "url"
import { prisma } from "../config/Database.js"
import path from "path"

export const getProducts = async () => {
    try {
        const data = await prisma.product.findMany({
            include: {
                category: true
            },
            orderBy: [{ created_at: "desc" }, { name: "asc" }],
        })

        return { success: true, statusCode: 200, message: "Products retrieved successfully.", data }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || "Internal server error." }
    }
}

export const createProduct = async (data) => {
    try {
        await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                image: data.image,
                category_id: data.categoryId,
                is_active: true,
            }
        })

        return { success: true, statusCode: 201, message: "Product created successfully." }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || "Internal server error." }
    }
}

export const editProduct = async (id, data) => {
    try {
        const product = await prisma.product.findUnique({ where: { id } })

        if (!product) return { success: false, statusCode: 404, message: "Product not found." }

        await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                image: data.image === null ? product.image : data.image,
            }
        })

        // hapus file lama jika ada
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const oldFilePath = path.join(__dirname, '../public/images', product.image);
        if (data.image && product.image && oldFilePath !== path.join(__dirname, '../public/images', data.image)) {
            try {
                const fs = await import('fs');
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            } catch (err) {
                console.error("Error deleting old image file:", err);
            }
        }

        return { success: true, statusCode: 200, message: "Product updated successfully." }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || "Internal server error." }
    }
}

export const changeProductStatus = async (id, isActive) => {
    try {
        const product = await prisma.product.findUnique({ where: { id } })

        if (!product) return { success: false, statusCode: 404, message: "Product not found." }

        await prisma.product.update({
            where: { id },
            data: {
                is_active: isActive
            }
        })

        return { success: true, statusCode: 200, message: `Product ${isActive ? 'activated' : 'deactivated'} successfully.` }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || "Internal server error." }
    }
}

export const getProductCategories = async () => {
    try {
        const data = await prisma.productCategory.findMany({
            include: {
                products: true
            },
            orderBy: [{ name: "asc" }, { created_at: "desc" }]
        })

        return { success: true, statusCode: 200, message: "Product categories retrieved successfully.", data }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || "Internal server error." }
    }
}

export const createCategoryProduct = async (data) => {
    try {
        await prisma.productCategory.create({
            data: {
                name: data.name,
                description: data.description
            }
        })

        return { success: true, statusCode: 201, message: "Product category created successfully." }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || "Internal server error." }
    }
}

export const removeProductCategory = async (id) => {
    try {
        const category = await prisma.productCategory.findUnique({ where: { id }, include: { products: true } })
        if (!category) return { success: false, statusCode: 404, message: "Product category not found." }
        if (category.products.length > 0) return { success: false, statusCode: 400, message: "Cannot delete category with associated products." }

        await prisma.productCategory.delete({ where: { id } })

        return { success: true, statusCode: 200, message: "Product category deleted successfully." }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || "Internal server error." }
    }
}

export const editProductCategory = async (id, data) => {
    try {
        const category = await prisma.productCategory.findUnique({ where: { id } })

        if (!category) return { success: false, statusCode: 404, message: "Product category not found." }

        await prisma.productCategory.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description
            }
        })

        return { success: true, statusCode: 200, message: "Product category updated successfully." }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || "Internal server error." }
    }
}