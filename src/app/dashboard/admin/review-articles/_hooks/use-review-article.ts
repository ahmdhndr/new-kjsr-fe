"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { errorToast } from "@/lib/error-toast";
import { articleServices } from "@/shared/services/article.service";

import {
  ReviewArticleDto,
  reviewArticleSchema,
} from "../_schema/review-article.schema";

const useReviewArticle = (token: string, id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof reviewArticleSchema>>({
    defaultValues: {
      action: undefined,
      note: "",
    },
  });

  const submitReviewArticleFn = async (payload: ReviewArticleDto) => {
    const result = await articleServices.submitReviewArticle(
      token,
      id,
      payload
    );
    return result.data;
  };

  const {
    mutateAsync: mutateSubmitReviewArticleAsync,
    isPending: isPendingSubmitReviewArticle,
  } = useMutation({
    mutationFn: submitReviewArticleFn,
    onError: (error) => {
      errorToast(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["article_reviews"] });
      toast.info(data.message);
      router.push("/dashboard/admin/review-articles");
    },
  });

  const onSubmit = (payload: ReviewArticleDto) =>
    mutateSubmitReviewArticleAsync(payload);

  return {
    form,
    onSubmit,
    isPendingSubmitReviewArticle,
  };
};

export default useReviewArticle;
