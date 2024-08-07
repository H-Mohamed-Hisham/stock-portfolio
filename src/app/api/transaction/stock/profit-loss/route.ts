// Lib
import prisma from "@/lib/prisma";

// Provider
import { getSessionUser } from "@/providers/auth/get-session-user";

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
          shares_bought: 0,
          remaining_share: 0,
        };
      }

      if (transactionType === "buy") {
        netSharesMap[stockId] = {
          ...netSharesMap[stockId],
          shares_bought: netSharesMap[stockId].shares_bought + shares,
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
      .filter((stockId) => netSharesMap[stockId].remaining_share === 0)
      .map((stockId) => ({
        stock_id: stockId,
        shares_bought: netSharesMap[stockId].shares_bought,
      }));

    const result: any = [];

    for (const item of sharesNotHolding) {
      const stock_id = item.stock_id;
      const totalShares = item.shares_bought;

      result.push({
        stock_id,
        // stockSymbol,
        totalShares,
        // totalInvested,
        // totalReturns,
        // profitLossStatus,
        // profitLossAmount,
        // status,
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error: any) {
    console.log("err :: ", error);
    return new Response("Failed to fetch stock profit/loss data", {
      status: 500,
    });
  }
};
