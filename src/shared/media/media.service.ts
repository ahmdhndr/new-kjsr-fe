import { instance } from "@/lib/axios/instance";

import { ENDPOINT } from "../constants/endpoint.constants";

type TFileURL = {
  filePath: string;
};

export const mediaServices = {
  upload: (token: string, payload: FormData) =>
    instance.post(`${ENDPOINT.MEDIA}/upload`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }),
  remove: (token: string, payload: TFileURL) =>
    instance.delete(`${ENDPOINT.MEDIA}/remove`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    }),
};
