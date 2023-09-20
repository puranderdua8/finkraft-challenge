import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize({username, password}) {
        try {
          const resp = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
          const user = await resp.json();
          return user;
        } catch (e) {
          console.log('something went wrong. show error message');
        }
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      // token.userRole = "admin"
      return token
    },
  },
}

export default NextAuth(authOptions);