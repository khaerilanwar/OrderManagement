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
            "Kadaluarsa",
        ]
        const status_detail = [
            "Pesanan Baru",
            "Menunggu Pembayaran",
            "Menunggu Konfirmasi",
            "Sedang Diproses",
            "Pesanan Selesai",
            "Pesanan Dibatalkan",
            "Pesanan Kadaluarsa"
        ]
        const description = [
            "Pesanan telah dibuat oleh pelanggan dan sedang menunggu konfirmasi dari admin untuk dibuatkan invoice atau tagihan pembayaran",
            "Invoice telah dibuat dan dikirimkan kepada pelanggan. Saat ini sistem menunggu pelanggan untuk melakukan pembayaran sesuai dengan instruksi yang diberikan",
            "Pelanggan telah melakukan pembayaran, dan sistem atau admin sedang memverifikasi bukti pembayaran tersebut",
            "Pembayaran telah dikonfirmasi dan pesanan sedang dalam tahap pemrosesan, seperti pembuatan, aktivasi, atau pengiriman produk digital sesuai dengan jenis layanan yang dipesan",
            "Proses pemesanan telah berhasil diselesaikan. Produk digital telah dikirim, diaktifkan, atau dapat diakses oleh pelanggan tanpa ada kendala. Tidak ada tindakan lanjutan yang diperlukan",
            "Pesanan dibatalkan karena alasan tertentu, seperti pelanggan tidak melakukan pembayaran dalam batas waktu yang ditentukan, permintaan pembatalan, atau alasan operasional lainnya",
            "Pesanan telah melewati batas waktu pembayaran atau konfirmasi, sehingga dianggap kadaluarsa. Pelanggan perlu membuat pesanan baru jika masih ingin mendapatkan layanan"
        ]

        // Membuat 10 kategori baru
        const status = Array.from({ length: status_name.length }, (_, idx) => ({
            id: idx + 1,
            name: status_name[idx],
            detail: status_detail[idx],
            description: description[idx],
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