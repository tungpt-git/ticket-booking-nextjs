import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/configs/auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
