import GoogleProvider from "next-auth/providers/google";

// Auth Callbacks
import { signInHandler, sessionHandler } from "@/providers/auth/callbacks";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }: any) {
      await signInHandler(profile);
      return true;
    },
    // Modifies the session object
    async session({ session }: any) {
      await sessionHandler(session);
      return session;
    },
  },
};
