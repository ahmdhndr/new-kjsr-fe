import { z } from "zod";

import { passwordWithConfirmationSchema } from "@/shared/schemas/password.schema";

export const registerSchema = z.object({
  firstName: z.string().nonempty("Nama pertama tidak boleh kosong"),
  lastName: z.string().nonempty("Nama terakhir tidak boleh kosong"),
  username: z.string().nonempty("Username tidak boleh kosong"),
  email: z
    .string()
    .nonempty("Email tidak boleh kosong")
    .email("Harus berupa email yang valid"),
  ...passwordWithConfirmationSchema.shape,
});

export const refineRegisterSchema = registerSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Password do not match",
    path: ["confirmPassword"],
  }
);
