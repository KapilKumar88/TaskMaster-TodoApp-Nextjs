import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // For the Register process
    Credentials({
      id: "credentialsSignUp",
      name: "credentialsSignUp",
      credentials: {
        email: {},
        password: {},
        name: {},
        confirmPassword: {},
      },
      async authorize(credentials) {
        console.log(credentials, ">>>>>>>>>>>>register>>>>>>>>>credentialsss");
        return null;
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
        console.log(credentials, '>>>>>>>>>>>>>>>>>>>>>>>>login ')

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
