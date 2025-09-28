import { ReviewArticleDto } from "@/app/dashboard/admin/review-articles/_schema/review-article.schema";
import { instance } from "@/lib/axios/instance";
import { ENDPOINT } from "@/shared/constants/endpoint.constants";

import { ArticleWithId } from "./article.schema";

export const articleServices = {
  createArticle: (token: string) =>
    instance.post(
      `${ENDPOINT.DASHBOARD_ARTICLE}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  getDetailArticleByUser: (token: string, id: string) =>
    instance.get(`${ENDPOINT.DASHBOARD_ARTICLE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateArticle: (token: string, payload: ArticleWithId) => {
    const { id, ...rest } = payload;
    return instance.patch(`${ENDPOINT.DASHBOARD_ARTICLE}/${id}`, rest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  submitForReview: (token: string, id: string) =>
    instance.post(
      `${ENDPOINT.DASHBOARD_ARTICLE}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  getArticlesByUser: (token: string, queries: string) =>
    instance.get(`${ENDPOINT.DASHBOARD_ARTICLE}?${queries}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  listArticle: (queries: string) =>
    instance.get(`${ENDPOINT.ARTICLE}?${queries}`),
  getDetailArticle: (slug: string) =>
    instance.get(`${ENDPOINT.ARTICLE}/${slug}`),
  deleteArticle: (token: string, id: string) =>
    instance.delete(`${ENDPOINT.DASHBOARD_ARTICLE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  listArticleReview: (token: string, queries: string) =>
    instance.get(`${ENDPOINT.DASHBOARD_ARTICLE}/review/list?${queries}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  detailArticleReview: (token: string, id: string) =>
    instance.get(`${ENDPOINT.DASHBOARD_ARTICLE}/review/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  submitReviewArticle: (token: string, id: string, payload: ReviewArticleDto) =>
    instance.post(`${ENDPOINT.DASHBOARD_ARTICLE}/${id}/review`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
