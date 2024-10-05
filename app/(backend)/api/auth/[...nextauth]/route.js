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

          // Return the user object (this is the key fix)
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            image: user.image || null,
          };
        } catch (err) {
          console.log("Error during login", err);
          return NextResponse.json(
            { error: "Authentication failed" },
            { status: 401 }
          ); // Return an error response
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
      return session; // Ensure you're returning the session object
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.role = user.role;
        token.image = user.image;
      }
      return token; // Ensure you're returning the token object
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
