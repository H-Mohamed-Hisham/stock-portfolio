import NextAuth from "next-auth/next";

// Config
import { authOptions } from "@/providers/auth/options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
