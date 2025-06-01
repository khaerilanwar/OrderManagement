import { faker, fakerID_ID } from "@faker-js/faker";
import { printLog } from "../utils/Helper.js";
import { prisma } from "../config/Database.js";

async function customerSeeder(length = 30) {
    try {
        // Menghapus semua data kategori yang ada
        await prisma.customer.deleteMany({});
        printLog("Deleted all customers.");

        await prisma.customer.create({
            data: {
                name: "Bang Anwar",
                email: "admin@gmail.com",
                phone: "081234567890",
                whatsapp: "081234567890",
                telegram: "https://t.me/banganwar",
                address: "Brebes, Jawa Tengah",
                created_at: new Date(),
                updated_at: new Date(),
            }
        })

        // Membuat 10 kategori baru
        const customers = Array.from({ length }, () => ({
            name: fakerID_ID.person.fullName(),
            email: fakerID_ID.internet.email().toLowerCase(),
            phone: fakerID_ID.phone.number(),
            telegram: fakerID_ID.book.genre(),
            whatsapp: fakerID_ID.phone.number(),
            address: fakerID_ID.location.streetAddress(),
            count_orders: fakerID_ID.number.int({ min: 0, max: 10 }),
            created_at: new Date(),
            updated_at: new Date(),
        }));

        await prisma.customer.createMany({ data: customers });
        printLog(`Created ${length} new customers.`);
    }
    catch (error) {
        console.error("Error creating customers data:", error);
    }
}

export default customerSeeder;