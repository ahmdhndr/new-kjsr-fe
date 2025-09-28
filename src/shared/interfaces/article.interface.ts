import { Category } from "./category.interface";

export interface Article {
  id?: string;
  title: string;
  coverUrl: string | null;
  author: Author;
  categories: Category[];
  status: ArticleStatus;
  publishedAt: Date | null;
  content: ContentNode;
  slug: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export enum ArticleStatus {
  DRAFT = "draft",
  IN_REVIEW = "in_review",
  NEEDS_REVISION = "needs_revision",
  PUBLISHED = "published",
}

export interface ArticleContentData {
  type?: string;
  attrs?: Record<string, string | number>;
  content?: ArticleContentData[];
  text?: string;
}

export interface ArticleContent {
  type: string;
  content: ArticleContentData;
}

export type ContentNode = {
  type?: string;
  attrs?: Record<string, string | number>;
  content?: ContentNode[];
  marks?: {
    type: string;
    attrs?: Record<string, unknown>;
    [key: string]: unknown;
  }[];
  text?: string;
  [key: string]: unknown;
};

export type DocumentContent = {
  type: "doc";
  content: ContentNode[];
};

export type Author = {
  firstName: string;
  lastName: string;
  email: string;
};
