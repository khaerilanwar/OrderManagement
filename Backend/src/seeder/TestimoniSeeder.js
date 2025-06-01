import { fakerID_ID } from "@faker-js/faker";
import { prisma } from "../config/Database.js";
import { printLog } from "../utils/Helper.js";

async function testimoniSeeder() {
    try {
        // Menghapus semua data kategori yang ada
        await prisma.testimoni.deleteMany({});
        printLog("Deleted all testimoni.");

        const orderDone = await prisma.order.findMany({
            where: { status_id: 5 },
            select: { id: true, customer_id: true },
        })

        // Membuat 10 kategori baru
        const status = Array.from({ length: orderDone.length }, (_, idx) => ({
            rating: fakerID_ID.number.int({ min: 1, max: 5 }),
            description: fakerID_ID.lorem.sentences({ min: 1, max: 2 }),
            status: true,
            order_id: orderDone[idx].id,
            customer_id: orderDone[idx].customer_id,
            created_at: new Date(),
            updated_at: new Date(),
        }));

        await prisma.testimoni.createMany({ data: status });
        printLog(`Created new testimoni data.`);
    }
    catch (error) {
        console.error("Error creating testimoni data:", error);
    }
}

export default testimoniSeeder;