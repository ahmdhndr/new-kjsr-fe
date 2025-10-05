import { PreapprovalStatus } from "@/shared/constants/global.constant";

export interface Preapproval {
  id: string;
  email: string;
  status: PreapprovalStatus;
}
