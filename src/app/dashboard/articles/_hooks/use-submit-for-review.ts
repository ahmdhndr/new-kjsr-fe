import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { errorToast } from "@/lib/error-toast";
import { articleServices } from "@/shared/services/article.service";

const useSubmitForReview = (token: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const submitForReviewFn = async (id: string) => {
    const result = await articleServices.submitForReview(token, id);
    return result.data;
  };

  const { mutate: mutateSubmitForReview, isPending: isPendingSubmitForReview } =
    useMutation({
      mutationFn: submitForReviewFn,
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
    mutateSubmitForReview,
    isPendingSubmitForReview,
  };
};

export default useSubmitForReview;
