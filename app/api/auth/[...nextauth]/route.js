import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        if (email === "" || password === "") {
          console.log("Empty credentials");
          return null;
        }

        try {
          const user = await db.user.findUnique({
            where: { email: email },
          });

          if (!user) {
            return null;
          }

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            role: user.role,
            image: user?.image || null,
          };
        } catch (err) {
          console.log("Error", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      if (account.provider === "credentials") {
        return true;
      }
    },
    async session({ session, token, user }) {
      if (token?.user) {
        session.user = token.user;
        session.user.id = token.user.id;
        session.role = token.role;
        session.image = token.image;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.role = user.role;
        token.image = user.image;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
