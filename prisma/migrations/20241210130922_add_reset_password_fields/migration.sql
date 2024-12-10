-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "size" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordExpires" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT;
