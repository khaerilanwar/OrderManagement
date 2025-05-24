import { fakerID_ID } from "@faker-js/faker";
import { printLog } from "../utils/Helper.js";
import { prisma } from "../config/Database.js";

async function categorySeeder(length = 10) {
    try {
        // Menghapus semua data kategori yang ada
        await prisma.category.deleteMany({});
        printLog("Deleted all categories.");

        // Membuat 10 kategori baru
        const categories = Array.from({ length }, () => ({
            name: fakerID_ID.lorem.word(),
            description: fakerID_ID.lorem.sentence({ min: 3, max: 6 }),
            created_at: new Date(),
            updated_at: new Date(),
        }));

        await prisma.category.createMany({ data: categories });
        printLog(`Created ${length} new categories.`);
    }
    catch (error) {
        console.error("Error creating categories:", error);
    }
}

export default categorySeeder;