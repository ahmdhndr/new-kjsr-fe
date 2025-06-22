import { z } from "zod";

export const verifyUserSchema = z.object({
  email: z.string().email("Harus berupa email yang valid"),
  otp: z.string().length(6, "OTP harus 6 digit"),
});
