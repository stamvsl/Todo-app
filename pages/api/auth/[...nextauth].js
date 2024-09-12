import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email.");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password.");
        }

        return { id: user.id, email: user.email, name: user.name }; // Include name here
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Customize the sign-in page URL
  },
  session: {
    strategy: "jwt", // Use JWT for session strategy
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name; // Include name in token
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name, // Include name in session
      };
      return session;
    },
  },
  debug: true, // Enable debug logs for troubleshooting
};

export default NextAuth(authOptions);
