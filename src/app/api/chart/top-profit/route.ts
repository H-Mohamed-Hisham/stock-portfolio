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

    const stockAggregates = await prisma.stockTransaction.groupBy({
      by: ["stock_id", "transaction_type"],
      _sum: {
        shares: true,
        total: true,
      },
    });

    const combinedTransactions = stockAggregates.reduce(
      (acc: any, current: any) => {
        const { stock_id, transaction_type, _sum } = current;

        // Find if this stock_id is already in the accumulator
        let existing = acc.find((item: any) => item.stock_id === stock_id);

        if (!existing) {
          // If not, create a new entry
          existing = {
            stock_id,
            invested: 0,
            returns: 0,
            buy_shares: 0,
            sell_shares: 0,
            stock: "ssdsd",
          };
          acc.push(existing);
        }

        // Add totals and shares based on transaction type
        if (transaction_type === "buy") {
          existing.invested += _sum.total;
          existing.buy_shares += _sum.shares;
        } else if (transaction_type === "sell") {
          existing.returns += _sum.total;
          existing.sell_shares += _sum.shares;
        }

        return acc;
      },
      []
    );

    // Filter to include only stocks where buy_shares - sell_shares = 0
    const result = combinedTransactions.filter(
      (stock: any) => stock.buy_shares === stock.sell_shares
    );

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
