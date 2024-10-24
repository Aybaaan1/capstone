/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_id_fkey";

-- AlterTable
ALTER TABLE "Assistance" ADD COLUMN     "reason" TEXT;

-- DropTable
DROP TABLE "Notification";
