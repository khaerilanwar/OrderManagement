import { prisma } from "../config/Database.js"
import cloudinary from "../config/Config.js"

export const getProducts = async () => {
    try {
        const data = await prisma.product.findMany({
            where: {
                is_active: true,
                is_deleted: false
            },
            include: {
                category: true
            },
            orderBy: [{ created_at: "desc" }, { name: "asc" }],
        })

        const categories = await prisma.productCategory.findMany({})

        return { success: true, statusCode: 200, message: "Products retrieved successfully.", data, categories }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || "Internal server error." }
    }
}

export const getAdminProducts = async () => {
    try {
        const data = await prisma.product.findMany({
            where: {
                is_deleted: false
            },
            include: {
                category: true,
                order: true
            },
            orderBy: [{ created_at: "desc" }, { name: "asc" }],
        })

        return { success: true, statusCode: 200, message: "Products retrieved successfully.", data }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || "Internal server error." }
    }
}

export const removeProduct = async (id) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: { order: true }
        })
        if (!product) return { success: false, statusCode: 404, message: "Product not found." }
        if (product.order.length > 0) return { success: false, statusCode: 400, message: "Cannot delete product with associated orders." }
        await prisma.product.delete({ where: { id } })

        // hapus file dari cloudinary jika ada
        if (product.cloud_public_id) {
            await cloudinary.uploader.destroy(product.cloud_public_id)
        }
        return { success: true, statusCode: 200, message: "Product deleted successfully." }
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
                price: data.price,
                cloud_public_id: data.cloudPublicId,
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
                price: data.price,
                description: data.description,
                image: data.image === null ? product.image : data.image,
                cloud_public_id: data.cloudPublicId === null ? product.cloud_public_id : data.cloudPublicId,
            }
        })

        // hapus file lama jika ada
        await cloudinary.uploader.destroy(product.cloud_public_id)

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

export const productCategoriesCustomer = async () => {
    try {
        const data = await prisma.productCategory.findMany({})

        if (data.length === 0) return { success: false, statusCode: 404, message: "No product categories found." }
        return { success: true, statusCode: 200, message: "Product categories retrieved successfully.", data }
    }
    catch (error) {
        return { success: false, statusCode: 500, message: error.message || "Internal server error." }
    }
}