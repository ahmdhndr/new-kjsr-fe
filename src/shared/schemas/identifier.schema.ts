import { z } from "zod";

import { emailRegex } from "@/lib/email-regex";

export const identifierSchema = z.object({
  identifier: z
    .string()
    .nonempty("Mohon untuk memasukkan Username atau Email")
    .refine(
      (val) => {
        const isEmail = emailRegex.test(val);
        const isUsername = /^[a-zA-Z0-9_]{3,30}$/.test(val);
        return isEmail || isUsername;
      },
      {
        message: "Input harus berupa username atau email yang valid",
      }
    ),
});
