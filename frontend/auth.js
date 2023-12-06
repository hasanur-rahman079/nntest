import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// login function
const login = async (credentials) => {
  const usersArray = await fetch(`${backendUrl}/users`).then((res) =>
    res.json()
  );

  // Transform users array into a plain object with usernames as keys
  const usersObject = usersArray.reduce((acc, user) => {
    acc[user.username] = user;
    return acc;
  }, {});

  // console.log("All users", usersObject);

  try {
    // check if user exists by matching with from given username credentials
    const user = usersObject[credentials.username];

    // console.log("user found", user);

    if (!user) {
      throw new Error("No user found!");
    }

    // Convert user to a plain object
    const plainUser = { ...user };

    // check if password matches with given password credentials
    const passwordMatch = await bcrypt.compare(
      credentials.password,
      plainUser.password
    );

    if (!passwordMatch) {
      throw new Error("Incorrect password!");
    }
    // if both matches, return user object
    return plainUser;
  } catch (error) {
    throw new Error("Error logging in");
  }
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // pass the login function to the credentials provider to authorize
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
