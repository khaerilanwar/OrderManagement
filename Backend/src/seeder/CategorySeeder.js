import { fakerID_ID } from "@faker-js/faker";
import { printLog } from "../utils/Helper.js";
import { prisma } from "../config/Database.js";

async function categorySeeder(length = 10) {
    try {
        // Menghapus semua data kategori yang ada
        await prisma.category.deleteMany({});
        printLog("Deleted all categories.");

        const productCategoryId = await prisma.productCategory.findMany({ select: { id: true } })


        // Membuat 10 kategori baru
        const categories = [
            {
                name: 'Pembuatan Bot',
                description: 'Kategori untuk pembuatan bot',
                product_category_id: fakerID_ID.helpers.arrayElement(productCategoryId).id,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Pembuatan Web',
                description: 'Kategori untuk pembuatan web',
                product_category_id: fakerID_ID.helpers.arrayElement(productCategoryId).id,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Lisensi Bot',
                description: 'Kategori untuk pembelian lisensi bot',
                product_category_id: fakerID_ID.helpers.arrayElement(productCategoryId).id,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Lisensi Web',
                description: 'Kategori untuk pembelian lisensi web',
                product_category_id: fakerID_ID.helpers.arrayElement(productCategoryId).id,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Pembuatan UI/UX',
                description: 'Kategori untuk pembuatan UI/UX',
                product_category_id: fakerID_ID.helpers.arrayElement(productCategoryId).id,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: '1',
                name: 'Produk Digital',
                description: 'Kategori Produk Digital',
                product_category_id: fakerID_ID.helpers.arrayElement(productCategoryId).id,
                created_at: new Date(),
                updated_at: new Date()
            },
        ]

        await prisma.category.createMany({ data: categories });
        printLog(`Created ${length} new categories.`);
    }
    catch (error) {
        console.error("Error creating categories:", error);
    }
}

export default categorySeeder;