import { prisma } from "@lib/prisma";
import { supabase } from "@lib/supabase";

// Types based on Prisma schema
export type TamuData = {
  id?: number;
  nama: string;
};

export type KonfirmasiData = {
  namaTamu: string;
  kehadiran: string;
};

export type UcapanData = {
  namaTamu: string;
  isiUcapan: string;
};

/**
 * Create or find a guest by name
 */
export async function getOrCreateTamu(nama: string) {
  try {
    // Try to find existing tamu
    let tamu = await prisma.tamu.findFirst({
      where: { nama: { equals: nama, mode: "insensitive" } },
    });

    // If tamu doesn't exist, create new one
    if (!tamu) {
      tamu = await prisma.tamu.create({
        data: { nama },
      });
    }

    return { success: true, data: tamu };
  } catch (error) {
    console.error("Error getting or creating tamu:", error);
    return { success: false, error: "Failed to process guest data" };
  }
}

/**
 * Submit RSVP form data
 */
export async function submitRSVP(nama: string, kehadiran: string) {
  try {
    // First get or create tamu
    const tamuResult = await getOrCreateTamu(nama);

    if (!tamuResult.success) {
      return tamuResult;
    }

    const tamu = tamuResult.data;

    if (!tamu) {
      throw new Error("Tamu data is missing");
    }

    // Check if konfirmasi already exists
    const existingKonfirmasi = await prisma.konfirmasiKehadiran.findUnique({
      where: { namaTamu: tamu.nama },
    });

    if (existingKonfirmasi) {
      // Update existing konfirmasi
      const updated = await prisma.konfirmasiKehadiran.update({
        where: { namaTamu: tamu.nama },
        data: { kehadiran },
      });
      return { success: true, data: updated };
    } else {
      // Create new konfirmasi
      const konfirmasi = await prisma.konfirmasiKehadiran.create({
        data: {
          namaTamu: tamu.nama,
          kehadiran,
        },
      });
      return { success: true, data: konfirmasi };
    }
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return { success: false, error: "Failed to submit RSVP" };
  }
}

/**
 * Submit wedding wish/ucapan
 */
export async function submitUcapan(nama: string, isiUcapan: string) {
  try {
    // First get or create tamu
    const tamuResult = await getOrCreateTamu(nama);

    if (!tamuResult.success) {
      return tamuResult;
    }

    const tamu = tamuResult.data;

    if (!tamu) {
      throw new Error("Tamu data is missing");
    }

    // Create ucapan
    const ucapan = await prisma.ucapan.create({
      data: {
        namaTamu: tamu.nama,
        isiUcapan,
      },
    });

    return { success: true, data: ucapan };
  } catch (error) {
    console.error("Error submitting ucapan:", error);
    return { success: false, error: "Failed to submit wedding wish" };
  }
}

/**
 * Get all wedding wishes/ucapan with tamu info
 */
export async function getAllUcapan() {
  try {
    const ucapan = await prisma.ucapan.findMany({
      include: {
        tamu: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: ucapan };
  } catch (error) {
    console.error("Error getting ucapan:", error);
    return { success: false, error: "Failed to fetch wedding wishes" };
  }
}

/**
 * Get RSVP stats
 */
export async function getRSVPStats() {
  try {
    const totalInvited = await prisma.tamu.count();
    const totalResponded = await prisma.konfirmasiKehadiran.count();
    const attending = await prisma.konfirmasiKehadiran.count({
      where: {
        kehadiran: "hadir",
      },
    });
    const notAttending = await prisma.konfirmasiKehadiran.count({
      where: {
        kehadiran: "tidak hadir",
      },
    });

    return {
      success: true,
      data: {
        totalInvited,
        totalResponded,
        attending,
        notAttending,
      },
    };
  } catch (error) {
    console.error("Error getting RSVP stats:", error);
    return { success: false, error: "Failed to fetch RSVP statistics" };
  }
}
