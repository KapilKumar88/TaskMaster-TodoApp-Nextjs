import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import { createUser, getUserDetailsByEmailId } from './services/user.service';
import { prisma } from './lib/prisma';
import serverSideConfig from './config/server.config';
import { verifyHash } from './lib/utils';
import {
  sendVerificationEmail,
  welcomeEmail,
} from './lib/helpers/email-helper';

const newPrismaAdapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: serverSideConfig.NODE_ENV !== 'production',
  adapter: newPrismaAdapter,
  session: {
    strategy: 'jwt',
  },
  providers: [
    // For the Registration process
    Credentials({
      id: 'credentialsSignUp',
      name: 'credentialsSignUp',
      credentials: {
        email: {},
        password: {},
        fullName: {},
        timeZone: {},
      },
      async authorize(credentials) {
        const user = await createUser({
          name: credentials.fullName as string,
          email: credentials.email as string,
          password: credentials.password as string,
          timeZone: credentials.timeZone as string,
        });

        welcomeEmail(user.name, user.email);
        sendVerificationEmail(user.id, user.email, user.name);

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.profileImage,
          fcmToken: null,
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
        const user = await getUserDetailsByEmailId(credentials.email as string);

        if (user === null) {
          throw new Error('Invalid credentials.');
        }

        const isValidPassword = await verifyHash(
          credentials.password as string,
          user.password,
        );

        if (!isValidPassword) {
          throw new Error('Invalid credentials.');
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.profileImage,
          fcmToken: user.fcmToken,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.fcmToken = user.fcmToken!;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.fcmToken = token.fcmToken;
      return session;
    },
  },
});
