import { Prisma } from "@prisma/client";

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

    const transaction_type =
      request.nextUrl.searchParams.get("transaction_type") || "all";

    const result = await prisma.stockTransaction.findMany({
      where: {
        user_id: userId,
        ...(["buy", "sell"].includes(transaction_type) && {
          transaction_type: transaction_type,
        }),
      },
      select: {
        transaction_id: true,
        date: true,
        transaction_type: true,
        shares: true,
        price: true,
        tax: true,
        total: true,
        Stock: {
          select: {
            stock_name: true,
            stock_symbol: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error: any) {
    return new Response("Failed to fetch stock transaction data", {
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
        price: new Prisma.Decimal(price),
        tax: new Prisma.Decimal(tax),
        total: new Prisma.Decimal(total),
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
