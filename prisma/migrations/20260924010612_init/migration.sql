-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdCard" (
    "id" SERIAL NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "IdCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdCard_studentId_key" ON "IdCard"("studentId");

-- AddForeignKey
ALTER TABLE "IdCard" ADD CONSTRAINT "IdCard_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
