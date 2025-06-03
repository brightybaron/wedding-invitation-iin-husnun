import { prisma } from "@lib/prisma";

export async function POST({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const nama = formData.get("nama") as string;
    const isiUcapan = formData.get("ucapan") as string;

    // Validasi input dasar
    if (!nama || !isiUcapan) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Nama dan ucapan diperlukan",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Simpan ucapan ke database menggunakan Prisma
    const newUcapan = await prisma.ucapan.create({
      data: {
        tamu: {
          connectOrCreate: {
            where: { nama },
            create: { nama },
          },
        },
        isiUcapan,
      },
      include: {
        tamu: true,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Terima kasih telah mengirimkan doa/ucapan!",
        data: newUcapan,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating ucapan:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Gagal mengirim ucapan",
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
