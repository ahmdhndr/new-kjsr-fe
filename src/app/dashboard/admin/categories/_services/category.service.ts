import { instance } from "@/lib/axios/instance";
import { ENDPOINT } from "@/shared/constants/endpoint.constants";

export const categoryServices = {
  createCategory: (
    token: string,
    payload: {
      name: string;
      description: string;
      iconUrl: string;
      iconPath: string;
    }
  ) =>
    instance.post(`${ENDPOINT.CATEGORY}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateCategory: (
    token: string,
    payload: {
      id: string;
      name: string;
      description: string;
      iconUrl: string;
      iconPath: string;
    }
  ) =>
    instance.patch(`${ENDPOINT.CATEGORY}/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  findAllCategory: (queries: string) =>
    instance.get(`${ENDPOINT.CATEGORY}?${queries}`),
  deleteCategory: (token: string, id: string) =>
    instance.delete(`${ENDPOINT.CATEGORY}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
