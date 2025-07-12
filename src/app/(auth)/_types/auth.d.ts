import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  token?: string;
}

interface IActivation {
  code: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface ILogin {
  identifier: string;
  password: string;
}

export type {
  IActivation,
  ILogin,
  IRegister,
  JWTExtended,
  SessionExtended,
  UserExtended,
};
