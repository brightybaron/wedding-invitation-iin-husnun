import { prisma } from "@lib/prisma";

export async function POST({ request }: { request: Request }) {
  try {
    // Parse JSON request body karena frontend mengirim data sebagai JSON
    const { nama, kehadiran } = await request.json();

    // Validasi input dasar
    if (!nama || !kehadiran) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Nama dan konfirmasi kehadiran diperlukan",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validasi nilai kehadiran harus "hadir" atau "tidak hadir"
    if (!["hadir", "tidak hadir"].includes(kehadiran)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Status kehadiran tidak valid",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Cek apakah tamu sudah ada di database
    let tamu = await prisma.tamu.findUnique({
      where: {
        nama: nama,
      },
      include: {
        konfirmasi: true,
      },
    });

    // Jika tamu belum ada, buat tamu baru
    if (!tamu) {
      // Buat tamu baru dan konfirmasi kehadiran sekaligus
      tamu = await prisma.tamu.create({
        data: {
          nama: nama,
          konfirmasi: {
            create: {
              kehadiran: kehadiran,
            },
          },
        },
        include: {
          konfirmasi: true,
        },
      });
    } else {
      // Jika tamu sudah ada, periksa konfirmasi kehadiran
      if (tamu.konfirmasi) {
        // Update konfirmasi kehadiran yang sudah ada
        await prisma.konfirmasiKehadiran.update({
          where: {
            id: tamu.konfirmasi.id,
          },
          data: {
            kehadiran: kehadiran,
            updatedAt: new Date(),
          },
        });
      } else {
        // Buat konfirmasi kehadiran baru jika belum ada
        await prisma.konfirmasiKehadiran.create({
          data: {
            namaTamu: nama,
            kehadiran: kehadiran,
          },
        });
      }

      // Ambil data tamu terbaru setelah update
      tamu = await prisma.tamu.findUnique({
        where: {
          nama: nama,
        },
        include: {
          konfirmasi: true,
        },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Terima kasih atas konfirmasi kehadiran Anda!",
        data: tamu,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error menyimpan konfirmasi kehadiran:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Gagal mengirim konfirmasi kehadiran",
        error: (error as Error).message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
