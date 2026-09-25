-- DropForeignKey
ALTER TABLE "IdCard" DROP CONSTRAINT "IdCard_studentId_fkey";

-- AddForeignKey
ALTER TABLE "IdCard" ADD CONSTRAINT "IdCard_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
