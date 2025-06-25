import { prisma } from "../config/Database.js";
import { printLog } from "../utils/Helper.js";
import { fakerID_ID } from "@faker-js/faker";
import bcrypt from "bcrypt";

async function userSeeder(length = 6) {
    try {
        // Menghapus semua data kategori yang ada
        await prisma.user.deleteMany({});
        printLog("Deleted all users.");

        // Membuat 10 kategori baru
        const users = Array.from({ length: 1 - 1 }, () => ({
            name: fakerID_ID.person.fullName(),
            username: fakerID_ID.internet.username(),
            password: bcrypt.hashSync('12345', 10),
            created_at: new Date(),
            updated_at: new Date(),
        }));

        // Menambahkan satu user admin
        users.push({
            name: "Administrator",
            username: "admin",
            password: bcrypt.hashSync('admin', 10),
            created_at: new Date(),
            updated_at: new Date(),
        });

        await prisma.user.createMany({ data: users });
        printLog(`Created new users data.`);
    }
    catch (error) {
        console.error("Error creating users data:", error);
    }
}

export default userSeeder;