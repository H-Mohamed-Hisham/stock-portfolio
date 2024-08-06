import { PrismaClient } from "@prisma/client";
import { stock, user } from "@/seed-data";

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.user.deleteMany();
    console.log("Deleted records in user table");

    await prisma.stock.deleteMany();
    console.log("Deleted records in stock table");

    await prisma.user.createMany({
      data: user,
    });
    console.log("Added user data");

    await prisma.stock.createMany({
      data: stock,
    });
    console.log("Added stock data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
