import { z } from "zod";

import { PreapprovalStatus } from "@/shared/constants/global.constant";

export const updateApprovalStatusSchema = z.object({
  email: z
    .string({ message: "property `email` is missing" })
    .email("Must be a valid email"),
  status: z.enum([PreapprovalStatus.APPROVED, PreapprovalStatus.REJECTED], {
    errorMap: (issue, _ctx) => {
      if (issue.code === "invalid_type") {
        return { message: "Property `status` is missing" };
      }
      if (issue.code === "invalid_enum_value") {
        return {
          message:
            "Invalid status value, must be either `approved` or `rejected`",
        };
      }
      return { message: "Invalid input" };
    },
  }),
  reason: z.string().optional(),
});

export type UpdateApprovalStatusDTO = z.infer<
  typeof updateApprovalStatusSchema
>;
