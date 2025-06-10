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
        const products_id = await prisma.product.findMany({ select: { id: true } });
        const products = await prisma.product.findMany({})
        const status_id = await prisma.status.findMany({ select: { id: true } });

        // Membuat 10 kategori baru
        const orders = Array.from({ length }, (_, index) => {
            const productId = fakerID_ID.helpers.arrayElement(products_id).id;
            const description = products.find(prod => prod.id === productId).description;
            const productName = products.find(prod => prod.id === productId).name;
            const inv = fakerID_ID.number.int({ min: 150000, max: 500000 })
            return {
                id: moment().format("YYYYMM") + (index + 1).toString().padStart(4, '0'),
                title: productName,
                down_payment: inv,
                invoice: inv,
                customer_id: fakerID_ID.helpers.arrayElement(customers_id).id,
                product_id: productId,
                description: description,
                // status_id: fakerID_ID.helpers.arrayElement(status_id).id,
                status_id: 5,
                category_id: fakerID_ID.helpers.arrayElement(categories_id).id,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

        // Nambahin completed date
        orders.forEach(order => {
            if (order.status_id === 5) {
                order.completed_at = fakerID_ID.date.between({ from: new Date('2025-05-01'), to: new Date() });
            } else {
                order.completed_at = null;
            }
        });

        await prisma.order.createMany({ data: orders });
        printLog(`Created ${length} new orders.`);
    }
    catch (error) {
        console.error("Error creating orders data:", error);
    }
}

export default orderSeeder;