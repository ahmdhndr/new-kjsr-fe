import { z } from "zod";

export const preRegisterSchema = z.object({
  email: z.string().email(),
});
