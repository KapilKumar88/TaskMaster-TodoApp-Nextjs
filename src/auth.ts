import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { createUser } from "./services/user.service";
import getPrismaInstance from "./lib/prisma";
import serverSideConfig from "./config/server.config";
const prismaInstance = await getPrismaInstance();

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: serverSideConfig.NODE_ENV !== "production",
  adapter: PrismaAdapter(prismaInstance),
  providers: [
    // For the Registration process
    Credentials({
      id: "credentialsSignUp",
      name: "credentialsSignUp",
      credentials: {
        email: {},
        password: {},
        fullName: {},
      },
      async authorize(credentials) {
        const user = await createUser({
          name: credentials.fullName as string,
          email: credentials.email as string,
          password: credentials.password as string,
        });
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.profileImage,
        };
      },
    }),

    // for the login process
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash)

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});
