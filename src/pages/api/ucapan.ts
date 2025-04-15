// File: pages/api/ucapan.ts
import type { APIRoute } from "astro";
import { submitUcapan } from "@lib/data";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { nama, isiUcapan } = body;

    if (!nama || !isiUcapan) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Nama dan ucapan harus diisi",
        }),
        { status: 400 }
      );
    }

    const result = await submitUcapan(nama, isiUcapan);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            (result as { error: string }).error || "Gagal menyimpan ucapan",
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
    console.error("Error in ucapan API:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Server error",
      }),
      { status: 500 }
    );
  }
};
