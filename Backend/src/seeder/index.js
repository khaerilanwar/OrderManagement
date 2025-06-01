import { prisma } from "../config/Database.js";
import { printLog } from "../utils/Helper.js";
import categorySeeder from "./CategorySeeder.js";
import customerSeeder from "./CustomerSeeder.js";
import statusSeeder from "./StatusSeeder.js";
import orderSeeder from "./OrderSeeder.js";
import userSeeder from "./UserSeeder.js";
import licenseSeeder from "./LicenseSeeder.js";
import productSeeder from "./ProductSeeder.js";
import testimoniSeeder from "./TestimoniSeeder.js";

async function main() {
    // Menjalankan seeder untuk user
    await userSeeder(6);
    printLog("User seeder completed successfully.")

    // Menjalankan seeder untuk produk
    await productSeeder(9);
    printLog("Product seeder completed successfully.");

    // Menjalankan seeder untuk kategori
    await categorySeeder(10);
    printLog("Category seeder completed successfully.");

    // Menjalankan seeder untuk customer
    await customerSeeder(30);
    printLog("Customer seeder completed successfully.");

    // Menjalankan seeder untuk status
    await statusSeeder();
    printLog("Status seeder completed successfully.");

    // Menjalankan seeder untuk order
    await orderSeeder(30);
    printLog("Order seeder completed successfully.");

    // Menjalankan seeder untuk token license
    await licenseSeeder(20)
    printLog("License seeder completed successfully")

    // Menjalankan seeder untuk testimoni
    await testimoniSeeder();
    printLog("Testimoni seeder completed successfully.");
}

main()
    .then(async () => {
        printLog("Seeder completed successfully.");
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        printLog("Seeder error :", error);
        await prisma.$disconnect();
        process.exit(1);
    });