// Lib
import prisma from "@/lib/prisma";

export const signInHandler = async (profile: any) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        user_email: profile.email,
      },
      select: {
        user_email: true,
      },
    });

    if (user.length === 0) {
      await prisma.user.create({
        data: {
          user_email: profile.email,
          user_name: profile.name,
        },
      });
    }

    await prisma.$disconnect();
  } catch (error: any) {
    console.log("Sign in error, Please try again later");
  }
};

export const sessionHandler = async (session: any) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        user_email: session.user.email,
      },
      select: {
        user_id: true,
      },
    });

    session.user.id = user[0]?.user_id?.toString();
  } catch (error) {
    console.log("Session error, Please try again later");
  }
};
