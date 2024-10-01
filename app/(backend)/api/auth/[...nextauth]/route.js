import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@/lib/db"; // Ensure your db connection is correct

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          console.log("Empty credentials");
          return null;
        }

        try {
          const user = await db.user.findUnique({
            where: { email },
          });

          if (!user) {
            console.log("User not found");
            return null;
          }

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            console.log("Invalid password");
            return null;
          }

          // Return the user object
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            image: user.image || null,
          };
        } catch (err) {
          console.log("Error during login", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "credentials") {
        return true;
      }
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
        session.role = token.user.role;
        session.image = token.user.image;
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
