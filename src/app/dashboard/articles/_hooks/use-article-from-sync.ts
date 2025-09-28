"use client";

import { useEffect, useRef } from "react";

import { Article, ContentNode } from "@/shared/interfaces/article.interface";

import { ArticleDto } from "../article.schema";

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Params {
  id: string | string[] | undefined;
  articleData: Article | null;
  form: any;
  setTitle: (title: string) => void;
  setDataContent: (content: ContentNode | undefined) => void;
  setSaveState: (val: any) => void;
  setArticle: (article: ArticleDto) => void;
}

export function useArticleFormSync({
  id,
  articleData,
  form,
  setTitle,
  setDataContent,
  setSaveState,
  setArticle,
}: Params) {
  const prevId = useRef<string | undefined>(undefined);
  // reset state setiap kali pindah article
  useEffect(() => {
    if (id !== prevId.current) {
      form.reset({});
      setTitle("");
      setDataContent(undefined);
      setSaveState(null);
      prevId.current = id as string | undefined;
    }
  }, [id, form]);

  // inject data baru hanya kalau articleData berubah
  useEffect(() => {
    if (!articleData) return;

    setArticle(articleData as unknown as ArticleDto);
    setDataContent(articleData.content);
    setSaveState(null);

    if (articleData.title === "Untitled") {
      form.setValue("title", "", { shouldDirty: false, shouldValidate: false });
      setTitle("Untitle article");
    } else {
      form.setValue("title", articleData.title, {
        shouldDirty: false,
        shouldValidate: false,
      });
      setTitle(articleData.title);
    }
  }, [articleData, form]);
}
