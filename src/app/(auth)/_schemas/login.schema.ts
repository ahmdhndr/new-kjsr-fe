import { z } from "zod";

import { identifierSchema } from "@/shared/schemas/identifier.schema";

export const loginSchema = z.object({
  ...identifierSchema.shape,
  password: z.string().nonempty("Mohon untuk memasukkan password"),
});
