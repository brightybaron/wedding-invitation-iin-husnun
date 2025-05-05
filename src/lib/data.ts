import { prisma } from "@lib/prisma";

export const getUcapan = async () => {
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
};
