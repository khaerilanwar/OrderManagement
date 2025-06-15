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

        const descriptionList = [
            "Produk ini sangat membantu saya dalam pekerjaan sehari-hari.",
            "Kualitasnya luar biasa, saya sangat puas dengan pembelian ini.",
            "Pengiriman cepat dan produk sesuai deskripsi.",
            "Layanan pelanggan yang responsif dan ramah.",
            "Harga yang sangat terjangkau untuk kualitas yang diberikan.",
            "Saya akan merekomendasikan produk ini kepada teman-teman saya.",
            "Pengalaman belanja yang menyenangkan, terima kasih!",
            "Produk ini melebihi ekspektasi saya, sangat direkomendasikan!",
            "Sangat puas dengan layanan dan produk yang diterima.",
            "Akan kembali berbelanja di sini lagi di masa depan.",
            "Sesuai banget sama yang saya cari. Pokoknya top deh, gak nyesel beli di sini!",
            "Kualitasnya sangat baik, sesuai dengan yang saya harapkan.",
            "Pengalaman belanja yang sangat memuaskan, terima kasih banyak!",
        ]

        // Membuat 10 kategori baru
        const status = Array.from({ length: orderDone.length }, (_, idx) => ({
            rating: fakerID_ID.number.int({ min: 1, max: 5 }),
            description: fakerID_ID.helpers.arrayElement(descriptionList),
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