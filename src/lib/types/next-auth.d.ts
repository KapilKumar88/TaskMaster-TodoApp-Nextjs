/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null
      email?: string | null
      image?: string | null
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
