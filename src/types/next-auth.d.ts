import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // boleh nullable biar fleksibel
    user: DefaultSession["user"];
  }

  interface JWT {
    accessToken?: string;
  }
}
