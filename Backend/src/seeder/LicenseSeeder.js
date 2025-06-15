import { prisma } from "../config/Database.js";
import { fakerID_ID } from "@faker-js/faker";
import { printLog } from "../utils/Helper.js";
import crypto from "crypto";

async function licenseSeeder(length = 20) {
    try {
        // Menghapus semua data kategori yang ada
        await prisma.license.deleteMany({});
        printLog("Deleted all License data.");

        const customers_id = await prisma.customer.findMany({ select: { id: true } });
        const customer_dev = await prisma.customer.findFirst({ where: { name: 'Bang Anwar' } })

        // Membuat 10 kategori baru
        const tokenLicenses = Array.from({ length }, (_, index) => ({
            name: fakerID_ID.lorem.words({ min: 2, max: 3 }),
            description: fakerID_ID.lorem.sentences({ min: 2, max: 5 }),
            token: crypto.randomBytes(32).toString('hex'),
            customer_id: fakerID_ID.helpers.arrayElement(customers_id).id,
            usage_limit: fakerID_ID.number.int({ min: 20, max: 70 }),
            used_count: fakerID_ID.number.int({ min: 0, max: 10 }),
            expire_date: fakerID_ID.date.between(
                { from: new Date('2025-06-10'), to: new Date('2025-08-27') }
            ),
            created_at: new Date(),
            updated_at: new Date()
        }));

        const tokenLicensesDev = Array.from({ length: 2 }, (_, index) => ({
            name: fakerID_ID.lorem.words({ min: 2, max: 3 }),
            description: fakerID_ID.lorem.sentences({ min: 2, max: 5 }),
            token: crypto.randomBytes(32).toString('hex'),
            customer_id: customer_dev.id,
            usage_limit: fakerID_ID.number.int({ min: 20, max: 70 }),
            used_count: fakerID_ID.number.int({ min: 0, max: 10 }),
            expire_date: fakerID_ID.date.between(
                { from: new Date('2025-06-15'), to: new Date('2025-08-27') }
            ),
            created_at: new Date(),
            updated_at: new Date()
        }));

        await prisma.license.createMany({ data: tokenLicenses });
        await prisma.license.createMany({ data: tokenLicensesDev });
        printLog(`Created ${length} new token license.`);
    }
    catch (error) {
        console.error("Error creating license data:", error);
    }
}

export default licenseSeeder;