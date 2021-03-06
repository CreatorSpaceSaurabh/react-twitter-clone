import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.tag = await session?.user?.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      session.user.uid = await token?.sub;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  // JWT_SECRET configuration
});
