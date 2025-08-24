import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { useModal } from "@/context/modal-context";
import { errorToast } from "@/lib/error-toast";

import { categoryServices } from "../_services/category.service";
import useCategory from "./use-category";

const useDeleteCategory = (token: string) => {
  const { close } = useModal();
  const { refetchCategory } = useCategory();

  const deleteCategory = async (id: string) => {
    const result = await categoryServices.deleteCategory(token, id);
    return result.data;
  };

  const { mutate: mutateDeleteCategory, isPending: isPendingDeleteCategory } =
    useMutation({
      mutationFn: deleteCategory,
      onError: (error) => {
        errorToast(error);
      },
      onSuccess: (data) => {
        close();
        toast.success(data.message);
        setTimeout(() => refetchCategory(), 100);
      },
    });

  return {
    isPendingDeleteCategory,
    mutateDeleteCategory,
  };
};

export default useDeleteCategory;
