import { fakerID_ID } from "@faker-js/faker";
import { printLog } from "../utils/Helper.js";
import { prisma } from "../config/Database.js";

async function productSeeder(length = 9) {
    try {

        await prisma.productCategory.deleteMany({});
        printLog("Deleted all product categories.");

        const categories = [
            {
                name: 'Desain',
                description: 'Desain grafis dan multimedia',
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
                name: 'Software',
                description: 'Software untuk produktivitas',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'License',
                description: 'Lisensi Perangkat Lunak',
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]

        const productReal = [
            {
                name: 'Power Point Template',
                description: 'Template Power Point untuk presentasi yang menarik, free 5x revisi',
                image: '1749482728930-967782280.jpg',
                category_id: 1,
                price: 50000,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Curriculum Vitae',
                description: 'Template Curriculum Vitae yang profesional, free 5x revisi',
                image: '1749482728930-967782280.jpg',
                category_id: 1,
                price: 25000,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Bot Auto Komen Sosial Media',
                description: 'Bot untuk auto like postingan Facebook, free 5x revisi',
                image: '1749482728930-967782280.jpg',
                category_id: 3,
                price: 100000,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Web Scraping Data',
                description: 'Layanan web scraping data dari website tertentu, free 5x revisi',
                image: '1749482728930-967782280.jpg',
                category_id: 3,
                price: 150000,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Web Application',
                description: 'Aplikasi web untuk bisnis Anda, free 5x revisi',
                image: '1749482728930-967782280.jpg',
                category_id: 3,
                price: 300000,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'License Bot Sosial Media',
                description: 'Lisensi bot untuk sosial media, free 5x revisi',
                image: '1749482728930-967782280.jpg',
                category_id: 4,
                price: 200000,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'License Application',
                description: 'Lisensi aplikasi untuk bisnis Anda, free 5x revisi',
                image: '1749482728930-967782280.jpg',
                category_id: 4,
                price: 250000,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'PUBG - M416GlacierLv6_Conqueror_S30',
                description: 'Akun PUBG Mobile level 65 dengan rank terakhir Conqueror di Season 30, memiliki M416 Glacier level 6 lengkap dengan efek kill dan loot crate, ditambah skin langka seperti AKM Golden Pharaoh dan AWM Godzilla. Outfit premium seperti Pharaoh X-Suit level 3, Blood Raven Set, dan Godzilla Armor sudah tersedia, serta kendaraan mewah Dacia Lamborghini dan Buggy Cyberpunk. KD ratio 5.1, emote lengkap, dan titel elit seperti Weapon Master & Overachiever menjadikan akun ini cocok untuk pemain yang ingin langsung tampil elite dan kompetitif',
                image: '1749482728930-967782280.jpg',
                category_id: 2,
                price: 500000,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Mobile Legends - Akun Elite',
                description: 'Akun Mobile Legends dengan rank Mythic, memiliki hero lengkap dan skin epic, serta emblem max level. Cocok untuk pemain yang ingin langsung bermain di level kompetitif tanpa harus grinding',
                image: '1749482728930-967782280.jpg',
                category_id: 2,
                price: 300000,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            }
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