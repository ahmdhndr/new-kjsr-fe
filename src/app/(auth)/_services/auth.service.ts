import { instance } from "@/lib/axios/instance";

import { ENDPOINT } from "../_constants/endpoint.constants";
import { ILogin, IRegister } from "../_types/auth";

type OtpUrlType = "resend-otp" | "forgot-password";

export const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${ENDPOINT.AUTH}/register`, payload),
  login: (payload: ILogin) => instance.post(`${ENDPOINT.AUTH}/login`, payload),
  getProfile: (token: string) =>
    instance.get(`${ENDPOINT.USER}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  verifyUser: (payload: { email: string; otp: string }) =>
    instance.post(`${ENDPOINT.AUTH}/verify-user`, payload),
  requestOtp: (identifier: string, url: OtpUrlType) =>
    instance.post(`${ENDPOINT.AUTH}/${url}`, { identifier }),
  resetPassword: (payload: {
    token: string;
    password: string;
    confirmPassword: string;
  }) => instance.post(`${ENDPOINT.AUTH}/reset-password`, payload),
  preApprovalRequest: (payload: { email: string }) =>
    instance.post(`${ENDPOINT.PREAPPROVAL}/request`, payload),
};
