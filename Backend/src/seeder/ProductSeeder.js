import { fakerID_ID } from "@faker-js/faker";
import { printLog } from "../utils/Helper.js";
import { prisma } from "../config/Database.js";

async function productSeeder(length = 9) {
    try {

        await prisma.productCategory.deleteMany({});
        printLog("Deleted all product categories.");

        const categories = [
            {
                name: 'Desain',
                description: 'Desain grafis dan multimedia',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Game',
                description: 'Game seru untuk dimainkan',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Software',
                description: 'Software untuk produktivitas',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]

        await prisma.productCategory.createMany({ data: categories })

        // Menghapus semua data kategori yang ada
        await prisma.product.deleteMany({});
        printLog("Deleted all products.");

        const categoryId = await prisma.productCategory.findMany({ select: { id: true } });

        // Membuat 10 kategori baru
        const products = Array.from({ length }, () => ({
            name: fakerID_ID.commerce.product(),
            description: fakerID_ID.lorem.sentence(),
            image: '1749482728930-967782280.jpg',
            category_id: fakerID_ID.helpers.arrayElement(categoryId).id,
            price: fakerID_ID.number.int({ min: 100000, max: 1000000 }),
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        }));

        await prisma.product.createMany({ data: products });
        printLog(`Created ${length} new products.`);
    }
    catch (error) {
        console.error("Error creating products:", error);
    }
}

export default productSeeder;