import { prisma } from "../config/Database.js"
import { CategoryDTO } from "../DTOs/CategoryDTO.js"

export const allCategories = async () => {
    try {
        const data = (await prisma.category.findMany({
            orderBy: [{ created_at: "desc" }, { name: "asc" }],
            include: {
                orders: true,
                product_category: true
            }
        }))
        // .map((item) => new CategoryDTO(item))

        return { success: true, statusCode: 200, data };

    } catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}

export const createNewCategory = async (name, description, productCategoryId) => {
    try {
        // Cek apakah category sudah ada
        const existCategory = await prisma.category.findFirst({
            where: { name }
        })

        if (existCategory) {
            return { success: false, statusCode: 400, message: "Category already exists." }
        }

        await prisma.category.create({
            data: {
                name, description,
                product_category_id: productCategoryId,
                created_at: new Date(),
                updated_at: new Date()
            }
        })

        return { success: true, statusCode: 201, message: "Category created successfully." }

    } catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}

export const removeCategory = async (id) => {
    try {
        const existCategory = await prisma.category.findFirst({
            where: { id },
            include: { orders: true }
        })

        // Cek apakah category ada di database
        if (!existCategory) {
            return { success: false, statusCode: 404, message: "Category not found." }
        }
        // Cek apakah category sudah terpakai di order
        if (existCategory.orders.length > 0) {
            return { success: false, statusCode: 400, message: "Category already used in orders." }
        }

        await prisma.category.delete({
            where: { id }
        })

        return { success: true, statusCode: 200, message: "Category deleted successfully." }

    } catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}

export const updateCategory = async (id, data) => {
    try {
        const existCategory = await prisma.category.findFirst({
            where: { id }
        })

        // Cek apakah category ada di database
        if (!existCategory) {
            return { success: false, statusCode: 404, message: "Category not found." }
        }

        await prisma.category.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                updated_at: new Date()
            }
        })

        return { success: true, statusCode: 200, message: "Category updated successfully." }

    } catch (err) {
        return { success: false, statusCode: 500, message: err.message || "Internal server error." }
    }
}