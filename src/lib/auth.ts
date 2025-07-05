import { AxiosError } from "axios";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authServices } from "@/app/(auth)/_services/auth.service";
import {
  JWTExtended,
  SessionExtended,
  UserExtended,
} from "@/app/(auth)/_types/auth";

import { env } from "./env/server";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 jam
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<UserExtended | null> {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        try {
          const result = await authServices.login({ identifier, password });

          const accessToken = result.data.data.token;
          if (!accessToken) throw new AxiosError("Unauthorized");

          const resultUser = await authServices.getProfile(accessToken);
          const user = resultUser.data.data;
          if (!user) throw new AxiosError("Invalid credentials.");

          // user.accessToken = accessToken;
          return user;
        } catch (_error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({
      token,
      session,
    }: {
      token: JWTExtended;
      session: SessionExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
};
