-- CreateTable
CREATE TABLE "ValidatedUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "idnumber" TEXT NOT NULL,

    CONSTRAINT "ValidatedUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ValidatedUser_email_key" ON "ValidatedUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ValidatedUser_idnumber_key" ON "ValidatedUser"("idnumber");
