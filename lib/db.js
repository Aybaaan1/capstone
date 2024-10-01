import { PrismaClient } from "@prisma/client";

let db;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  db = global.prisma;
}

db.$connect()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

export default db;
