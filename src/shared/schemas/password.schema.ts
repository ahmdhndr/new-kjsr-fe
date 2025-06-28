import { z } from "zod";

export const passwordSchema = z
  .string()
  .nonempty("Password tidak boleh kosong")
  .min(8, "Password harus memiliki setidaknya 8 karakter")
  .regex(/[A-Z]/, "Password harus mempunyai minimal satu huruf besar")
  .regex(/\d/, "Password harus mempunyai minimal satu angka")
  .regex(
    /[@$!%*?&_]/,
    "Password harus mempunyai minimal satu karakter spesial"
  );

export const passwordWithConfirmationSchema = z.object({
  password: passwordSchema,
  confirmPassword: z
    .string()
    .nonempty("Konfirmasi password tidak boleh kosong"),
});

export const refinePasswordWithConfirmationSchema =
  passwordWithConfirmationSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Password do not match",
      path: ["confirmPassword"],
    }
  );
