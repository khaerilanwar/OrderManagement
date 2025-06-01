import { fakerID_ID } from "@faker-js/faker";
import { prisma } from "../config/Database.js";
import { printLog } from "../utils/Helper.js";

async function statusSeeder() {
    try {
        // Menghapus semua data kategori yang ada
        await prisma.status.deleteMany({});
        printLog("Deleted all status.");

        const status_name = [
            "Baru",
            "Bayar",
            "Konfirmasi",
            "Diproses",
            "Selesai",
            "Batal",
        ]
        const status_detail = [
            "Pesanan Baru",
            "Menunggu Pembayaran",
            "Menunggu Konfirmasi",
            "Sedang Diproses",
            "Pesanan Selesai",
            "Pesanan Dibatalkan",
        ]
        // Membuat 10 kategori baru
        const status = Array.from({ length: status_name.length }, (_, idx) => ({
            id: idx + 1,
            name: status_name[idx],
            detail: status_detail[idx],
            description: fakerID_ID.lorem.sentences({ min: 1, max: 2 }),
            sequence: idx + 1,
            created_at: new Date(),
            updated_at: new Date(),
        }));

        await prisma.status.createMany({ data: status });
        printLog(`Created new status data.`);
    }
    catch (error) {
        console.error("Error creating status data:", error);
    }
}

export default statusSeeder;