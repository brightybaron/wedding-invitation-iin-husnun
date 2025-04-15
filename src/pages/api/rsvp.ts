// File: pages/api/rsvp.ts
import type { APIRoute } from "astro";
import { submitRSVP } from "@lib/data";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { nama, kehadiran } = body;

    if (!nama || !kehadiran) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Nama dan kehadiran harus diisi",
        }),
        { status: 400 }
      );
    }

    const result = await submitRSVP(nama, kehadiran);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: (result as { error: string }).error || "Gagal menyimpan data",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: result.data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in RSVP API:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Server error",
      }),
      { status: 500 }
    );
  }
};
