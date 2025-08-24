import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useModal } from "@/context/modal-context";
import { useMediaHandling } from "@/hooks/use-media-handling";
import { errorToast } from "@/lib/error-toast";

import { categoryServices } from "../_services/category.service";
import useCategory from "./use-category";

const addCategoryFormSchema = z.object({
  name: z.string().nonempty("Please enter the category name"),
  description: z.string().nonempty("Please enter the category description"),
  iconUrl: z.string().nonempty("Please upload an icon"),
  iconPath: z.string(),
});

const useAddCategory = (token: string) => {
  const { close } = useModal();
  const { refetchCategory } = useCategory();
  const {
    mutateUploadFile,
    mutateDeleteFile,
    isPendingUploadFile,
    isPendingDeleteFile,
  } = useMediaHandling(token);

  const form = useForm<z.infer<typeof addCategoryFormSchema>>({
    resolver: zodResolver(addCategoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      iconUrl: "",
    },
  });

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback(path, fileUrl) {
          form.setValue("iconUrl", fileUrl);
          form.setValue("iconPath", path);
        },
        folder: "categories",
      });
    }
  };

  const handleDeleteIcon = async (onChange: (files: FileList) => void) => {
    const filePath = form.getValues("iconPath");

    if (typeof filePath === "string") {
      mutateDeleteFile({ filePath, callback: () => onChange });
    }
  };

  const addCategory = async (
    payload: z.infer<typeof addCategoryFormSchema>
  ) => {
    const result = await categoryServices.createCategory(token, payload);
    return result.data;
  };

  const { mutate: mutateAddCategory, isPending: isPendingAddCategory } =
    useMutation({
      mutationFn: addCategory,
      onError: (error) => {
        errorToast(error);
      },
      onSuccess: (data) => {
        form.reset();
        close();
        toast.success(data.message);
        setTimeout(() => refetchCategory(), 100);
      },
    });

  const onSubmit = (values: z.infer<typeof addCategoryFormSchema>) =>
    mutateAddCategory(values);

  return {
    form,
    onSubmit,
    isPendingAddCategory,

    handleUploadIcon,
    handleDeleteIcon,
    isPendingUploadFile,
    isPendingDeleteFile,
  };
};

export default useAddCategory;
