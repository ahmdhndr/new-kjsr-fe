import { instance } from "@/lib/axios/instance";
import { ENDPOINT } from "@/shared/constants/endpoint.constants";

import { UpdateApprovalStatusDTO } from "../_dto/preapproval.dto";

export const preapprovalServices = {
  listApproval: (token: string, queries: string) =>
    instance.get(`${ENDPOINT.PREAPPROVAL}/lists?${queries}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateApproval: (token: string, payload: UpdateApprovalStatusDTO) =>
    instance.patch(`${ENDPOINT.PREAPPROVAL}/approval`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
