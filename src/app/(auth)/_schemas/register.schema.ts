import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().nonempty("Nama pertama tidak boleh kosong"),
    lastName: z.string().nonempty("Nama terakhir tidak boleh kosong"),
    username: z.string().nonempty("Username tidak boleh kosong"),
    email: z
      .string()
      .nonempty("Email tidak boleh kosong")
      .email("Harus berupa email yang valid"),
    password: z
      .string()
      .nonempty("Password tidak boleh kosong")
      .min(8, "Password harus memiliki setidaknya 8 karakter")
      .regex(/[A-Z]/, "Password harus mempunyai minimal satu huruf besar")
      .regex(/\d/, "Password harus mempunyai minimal satu angka")
      .regex(
        /[@$!%*?&_]/,
        "Password harus mempunyai minimal satu karakter spesial"
      ),
    confirmPassword: z.string().nonempty("Confirm password tidak boleh kosong"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
