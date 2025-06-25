import { fakerID_ID } from "@faker-js/faker";
import { printLog } from "../utils/Helper.js";
import { prisma } from "../config/Database.js";

async function productSeeder(length = 9) {
    try {

        await prisma.productCategory.deleteMany({});
        printLog("Deleted all product categories.");

        const categories = [
            {
                name: 'Desain Kreatif',
                description: 'Cocok untuk kebutuhan personal, bisnis, maupun branding digital. Semua desain disajikan dalam format siap pakai atau dapat disesuaikan (editable).',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Game',
                description: 'Akun game seru untuk dimainkan',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Dokumen & Template Profesional ',
                description: 'Dirancang untuk mempermudah penyusunan dokumen formal dan meningkatkan efisiensi dalam pembuatan berkas profesional.',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]

        const productReal = [
            {
                name: 'Akun Game Mobile Legends',
                description: 'Akun Mobile Legends (MLBB) dengan spesifikasi lengkap dan harga terjangkau. Cocok untuk kamu yang ingin langsung push rank tanpa mulai dari nol!',
                image: 'https://res.cloudinary.com/dqka6jwus/image/upload/v1750691792/uploads/wzracb06uh3jp9dcvkue.jpg',
                category_id: 2,
                price: 999000,
                is_active: true,
                is_deleted: false,
                cloud_public_id: 'uploads/wzracb06uh3jp9dcvkue',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Surat Lamaran Kerja (Custom)',
                description: 'Bisa disesuaikan dengan permintaan khusus (free revisi 5 x)',
                image: 'https://res.cloudinary.com/dqka6jwus/image/upload/v1750778516/uploads/hghlodzwmq0fji5oks1f.jpg',
                category_id: 3,
                price: 30000,
                is_active: true,
                is_deleted: false,
                cloud_public_id: 'uploads/hghlodzwmq0fji5oks1f',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Curiculum Vittae',
                description: 'Bisa disesuaikan dengan permintaan khusus (free revisi 5 x)',
                image: 'https://res.cloudinary.com/dqka6jwus/image/upload/v1750812247/uploads/wntutbp4wrvxaye98u8b.jpg',
                category_id: 3,
                price: 25000,
                is_active: true,
                is_deleted: false,
                cloud_public_id: 'uploads/wntutbp4wrvxaye98u8b',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Portofolio',
                description: 'Disesuaikan dengan profil dengan free revisi 5 x',
                image: 'https://res.cloudinary.com/dqka6jwus/image/upload/v1750691103/uploads/grt5ttcgoqpolejswfqn.jpg',
                category_id: 3,
                price: 100000,
                is_active: true,
                is_deleted: false,
                cloud_public_id: 'uploads/grt5ttcgoqpolejswfqn',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Logo',
                description: 'Logo produk dengan desain yang menarik (free revisi 3x)',
                image: 'https://res.cloudinary.com/dqka6jwus/image/upload/v1750691332/uploads/plj9gzyypyvhzgn5khar.jpg',
                category_id: 1,
                price: 250000,
                is_active: true,
                is_deleted: false,
                cloud_public_id: 'uploads/plj9gzyypyvhzgn5khar',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Power Point Presentasi',
                description: 'Tingkatkan kualitas presentasi Anda dengan template PowerPoint profesional yang dirancang untuk kebutuhan bisnis, akademik, maupun personal. File mudah di-edit, dilengkapi slide informatif dan layout elegan yang membuat presentasi Anda lebih menarik dan meyakinkan. (Free Revisi 3x)',
                image: 'https://res.cloudinary.com/dqka6jwus/image/upload/v1750691517/uploads/o3s2asxhrjiaqoxmaj2h.jpg',
                category_id: 3,
                price: 150000,
                is_active: true,
                is_deleted: false,
                cloud_public_id: 'uploads/o3s2asxhrjiaqoxmaj2h',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Poster Promosi',
                description: 'Poster digital untuk promosi produk, event, diskon, atau branding bisnis kamu. Desain profesional dan mudah digunakan, cocok untuk UMKM, toko online, atau content creator.',
                image: 'https://res.cloudinary.com/dqka6jwus/image/upload/v1750692225/uploads/t9i56rell1qubzglhrxf.jpg',
                category_id: 1,
                price: 200000,
                is_active: true,
                is_deleted: false,
                cloud_public_id: 'uploads/t9i56rell1qubzglhrxf',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]

        await prisma.productCategory.createMany({ data: categories })

        // Menghapus semua data kategori yang ada
        await prisma.product.deleteMany({});
        printLog("Deleted all products.");

        const categoryId = await prisma.productCategory.findMany({ select: { id: true } });

        // Membuat 10 kategori baru
        const products = Array.from({ length }, () => ({
            name: fakerID_ID.commerce.product(),
            description: fakerID_ID.lorem.sentence(),
            image: '1749482728930-967782280.jpg',
            category_id: fakerID_ID.helpers.arrayElement(categoryId).id,
            price: fakerID_ID.number.int({ min: 1000, max: 10000 }),
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        }));

        await prisma.product.createMany({ data: productReal });
        printLog(`Created ${length} new products.`);
    }
    catch (error) {
        console.error("Error creating products:", error);
    }
}

export default productSeeder;