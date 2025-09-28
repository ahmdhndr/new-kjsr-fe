import { z } from "zod";

export enum ActionEnum {
  APPROVED = "approved",
  NEED_REVISION = "need_revision",
}

export const reviewArticleSchema = z.object({
  action: z
    .union([z.nativeEnum(ActionEnum), z.literal("")])
    .refine((val) => val !== "", { message: "Pilih action terlebih dahulu" }),
  note: z.string().nonempty({ message: "Catatan perlu diisi" }),
});

export type ReviewArticleDto = z.infer<typeof reviewArticleSchema>;
