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
      by: ["stock_id", "transaction_type"],
      where: {
        user_id: userId,
      },
      _sum: {
        shares: true,
      },
    });

    const netSharesMap: any = {};

    transactions.forEach((transaction: any) => {
      const stockId = transaction.stock_id;
      const transactionType = transaction.transaction_type;
      const shares = transaction._sum.shares;

      if (!netSharesMap[stockId]) {
        netSharesMap[stockId] = {
          remaining_share: 0,
        };
      }

      if (transactionType === "buy") {
        netSharesMap[stockId] = {
          ...netSharesMap[stockId],
          remaining_share: netSharesMap[stockId].remaining_share + shares,
        };
      } else if (transactionType === "sell") {
        netSharesMap[stockId] = {
          ...netSharesMap[stockId],
          remaining_share: netSharesMap[stockId].remaining_share - shares,
        };
      }
    });

    const sharesNotHolding: any = Object.keys(netSharesMap)
      .filter((stockId) => netSharesMap[stockId].remaining_share > 0)
      .map((stockId) => ({
        stock_id: stockId,
        remaining_share: netSharesMap[stockId].remaining_share,
      }));

    const result: any = [];

    for (const item of sharesNotHolding) {
      const stock: any = await prisma.stock.findUnique({
        where: {
          stock_id: item.stock_id,
        },
      });
      const stock_name = stock.stock_name;
      const stock_symbol = stock.stock_symbol;

      const total_shares = item.remaining_share;

      const buy_transactions = await prisma.stockTransaction.findMany({
        where: {
          user_id: userId,
          stock_id: item.stock_id,
          transaction_type: "buy",
        },
      });
      const total_invested = buy_transactions.reduce(
        (acc: any, t) => acc + Number(t.total),
        0
      );

      result.push({
        stock_name,
        stock_symbol,
        total_shares,
        total_invested: formatNumber(total_invested),
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error: any) {
    console.log("err :: ", error);
    return new Response("Failed to fetch stock holding data", {
      status: 500,
    });
  }
};
