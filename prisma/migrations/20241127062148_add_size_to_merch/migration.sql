-- AlterTable
ALTER TABLE "Merch" ADD COLUMN     "size" TEXT;

-- AlterTable
ALTER TABLE "Reserve" ALTER COLUMN "status" SET DEFAULT 'pending';
