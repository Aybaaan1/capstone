-- DropForeignKey
ALTER TABLE "Reserve" DROP CONSTRAINT "Reserve_itemId_fkey";

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ItemReservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
