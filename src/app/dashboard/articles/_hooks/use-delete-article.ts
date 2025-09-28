import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { errorToast } from "@/lib/error-toast";
import { articleServices } from "@/shared/services/article.service";

const useDeleteArticle = (token: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteArticle = async (id: string) => {
    const result = await articleServices.deleteArticle(token, id);
    return result.data;
  };

  const { mutate: mutateDeleteArticle, isPending: isPendingDeleteArticle } =
    useMutation({
      mutationFn: deleteArticle,
      onError: (error) => {
        errorToast(error);
      },
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["articles"] });
        router.push("/dashboard/articles");
      },
    });

  return {
    isPendingDeleteArticle,
    mutateDeleteArticle,
  };
};

export default useDeleteArticle;
