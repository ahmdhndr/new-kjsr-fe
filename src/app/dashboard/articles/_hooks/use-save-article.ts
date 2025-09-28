import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoCloudDoneOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdErrorOutline } from "react-icons/md";
import { z } from "zod";

import { articleServices } from "@/shared/services/article.service";

import { ArticleWithId, articleSchema } from "../article.schema";

const useSaveArticle = (token: string) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof articleSchema>>({
    defaultValues: {
      title: "",
      content: null,
      coverUrl: "",
      coverPath: "",
      categories: [],
    },
  });
  const [title, setTitle] = useState<string>("Untitled article");
  const [saveState, setSaveState] = useState<IconType | null>(null);

  const saveArticle = async (payload: ArticleWithId) => {
    const result = await articleServices.updateArticle(token, payload);
    return result.data;
  };

  const { mutate: mutateSaveArticle, isPending: isPendingSaveArticle } =
    useMutation({
      mutationFn: saveArticle,
      onError: (_error) => {
        // errorToast(error);
        setSaveState(() => MdErrorOutline);
      },
      onMutate: () => {
        setSaveState(() => FaArrowsRotate);
      },
      onSuccess: (data) => {
        // toast.success(data.message);
        setTimeout(() => {
          setSaveState(() => IoCloudDoneOutline);
        }, 1000);
        queryClient.invalidateQueries({ queryKey: ["articles"] });
        queryClient.invalidateQueries({ queryKey: ["articles", data.data] });
        setTitle(data.data.title);
      },
    });

  const setArticle = (article: ArticleWithId) => {
    form.reset(article);
  };

  const onSubmit = (values: ArticleWithId) => mutateSaveArticle(values);

  return {
    form,
    onSubmit,
    isPendingSaveArticle,
    mutateSaveArticle,
    setArticle,
    title,
    setTitle,
    saveState,
    setSaveState,
  };
};

export default useSaveArticle;
