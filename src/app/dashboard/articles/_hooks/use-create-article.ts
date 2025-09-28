"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { errorToast } from "@/lib/error-toast";
import { articleServices } from "@/shared/services/article.service";

const useCreateArticle = (token: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createArticle = async () => {
    const result = await articleServices.createArticle(token);
    return result.data;
  };

  const { mutate: mutateCreateArticle, isPending: isPendingCreateArticle } =
    useMutation({
      mutationFn: createArticle,
      onError: (error) => {
        errorToast(error);
      },
      onSuccess: (_data) => {
        toast.success("Article created and marked as draft");
        queryClient.invalidateQueries({ queryKey: ["articles"] });
        // form.reset();
        // router.push(`/dashboard/articles/${data.data.id}`);
      },
      onSettled: (data) => {
        if (data) {
          router.push(`/dashboard/articles/${data.data.id}`);
        }
      },
    });

  // const onSubmit =
  return {
    mutateCreateArticle,
    isPendingCreateArticle,
  };
};

export default useCreateArticle;
