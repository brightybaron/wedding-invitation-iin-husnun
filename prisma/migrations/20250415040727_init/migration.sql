-- CreateTable
CREATE TABLE "Tamu" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tamu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KonfirmasiKehadiran" (
    "id" SERIAL NOT NULL,
    "namaTamu" TEXT NOT NULL,
    "kehadiran" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KonfirmasiKehadiran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ucapan" (
    "id" SERIAL NOT NULL,
    "namaTamu" TEXT NOT NULL,
    "isiUcapan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ucapan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tamu_nama_key" ON "Tamu"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "KonfirmasiKehadiran_namaTamu_key" ON "KonfirmasiKehadiran"("namaTamu");

-- AddForeignKey
ALTER TABLE "KonfirmasiKehadiran" ADD CONSTRAINT "KonfirmasiKehadiran_namaTamu_fkey" FOREIGN KEY ("namaTamu") REFERENCES "Tamu"("nama") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ucapan" ADD CONSTRAINT "Ucapan_namaTamu_fkey" FOREIGN KEY ("namaTamu") REFERENCES "Tamu"("nama") ON DELETE RESTRICT ON UPDATE CASCADE;
