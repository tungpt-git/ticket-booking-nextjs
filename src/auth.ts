import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { GoogleClientId, GoogleClientSecret } from "./configs/auth";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GoogleClientId,
      clientSecret: GoogleClientSecret,
    }),
  ],
});

export { handler as GET, handler as POST };
