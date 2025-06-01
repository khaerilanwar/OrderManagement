import { prisma } from "../config/Database.js";
import { fakerID_ID } from "@faker-js/faker";
import { printLog } from "../utils/Helper.js";
import moment from "moment";

async function orderSeeder(length = 30) {
    try {
        // Menghapus semua data kategori yang ada
        await prisma.order.deleteMany({});
        printLog("Deleted all orders.");

        const customers_id = await prisma.customer.findMany({ select: { id: true } });
        const categories_id = await prisma.category.findMany({ select: { id: true } });
        const status_id = await prisma.status.findMany({ select: { id: true } });

        // Membuat 10 kategori baru
        const orders = Array.from({ length }, (_, index) => ({
            id: moment().format("YYYYMM") + (index + 1).toString().padStart(4, '0'),
            title: fakerID_ID.lorem.words({ min: 2, max: 4 }),
            description: fakerID_ID.lorem.sentences({ min: 2, max: 5 }),
            down_payment: fakerID_ID.number.int({ min: 50000, max: 200000 }),
            invoice: fakerID_ID.number.int({ min: 150000, max: 500000 }),
            customer_id: fakerID_ID.helpers.arrayElement(customers_id).id,
            status_id: fakerID_ID.helpers.arrayElement(status_id).id,
            category_id: fakerID_ID.helpers.arrayElement(categories_id).id,
            created_at: new Date(),
            updated_at: new Date(),
        }));

        await prisma.order.createMany({ data: orders });
        printLog(`Created ${length} new orders.`);
    }
    catch (error) {
        console.error("Error creating orders data:", error);
    }
}

export default orderSeeder;