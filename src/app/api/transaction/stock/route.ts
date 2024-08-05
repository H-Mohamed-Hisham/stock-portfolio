// Lib
import prisma from "@/lib/prisma";

// Provider
import { getSessionUser } from "@/providers/auth/get-session-user";

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

export const POST = async (request: any) => {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorised Access : User ID is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;
    const { stock_id, date, transaction_type, shares, price, tax, total } =
      await request.json();

    await prisma.stockTransaction.create({
      data: {
        stock_id: stock_id,
        user_id: userId,
        transaction_type: transaction_type,
        date: date,
        shares: shares,
        price: price,
        tax: tax,
        total: total,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Transaction added successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Failed to add transaction :: ", error);
    return new Response("Failed to add transaction", {
      status: 500,
    });
  }
};
