// Lib
import prisma from "@/lib/prisma";

export const GET = async (request: any) => {
  try {
    const result = await prisma.stock.findMany({
      select: {
        stock_id: true,
        stock_symbol: true,
        stock_name: true,
      },
    });

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error: any) {
    return new Response("Failed to fetch stock data", {
      status: 500,
    });
  }
};
