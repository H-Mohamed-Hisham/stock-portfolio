// Lib
import prisma from "@/lib/prisma";

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
      by: ["transaction_type"],
      where: { user_id: userId },
      _sum: {
        total: true,
      },
    });

    const invested =
      transactions.find((r) => r.transaction_type === "buy")?._sum.total || 0;
    const returns =
      transactions.find((r) => r.transaction_type === "sell")?._sum.total || 0;

    const result = {
      invested: Number(invested),
      returns: Number(returns),
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error: any) {
    return new Response("Failed to fetch stock data", {
      status: 500,
    });
  }
};
