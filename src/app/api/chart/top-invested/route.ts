// Lib
import prisma from "@/lib/prisma";
import { formatNumber } from "@/lib/formatter";

// Provider
import { getSessionUser } from "@/providers/auth/get-session-user";

export const dynamic = "force-dynamic";

export const GET = async (request: any) => {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorised Access : User ID is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const transactions = await prisma.stockTransaction.groupBy({
      by: ["stock_id"],
      where: {
        transaction_type: "buy",
      },
      _sum: {
        total: true,
      },
      orderBy: {
        _sum: {
          total: "desc",
        },
      },
      take: 3,
    });

    const stockIds = transactions.map((item) => item.stock_id);

    const stocks = await prisma.stock.findMany({
      where: {
        stock_id: {
          in: stockIds,
        },
      },
      select: {
        stock_id: true,
        stock_symbol: true,
      },
    });

    const result = stocks.map((stock) => {
      const total = Number(
        transactions.find((item) => item.stock_id === stock.stock_id)?._sum
          .total || 0
      );
      return {
        stock: stock.stock_symbol,
        invested: total,
      };
    });

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error: any) {
    console.log("err :: ", error);
    return new Response("Failed to fetch top 3 stocks invested", {
      status: 500,
    });
  }
};
