// mutations/upload-media-mutation.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { errorToast } from "@/lib/error-toast";
import { mediaServices } from "@/shared/media/media.service";

// Define a type for the returned data for clarity
type UploadedMedia = {
  filePath: string;
  fullUrl: string;
};

export const useMediaMutation = (token: string) => {
  // The uploadFile function can be simplified and moved into the mutation
  const {
    mutate: mutateUploadFile,
    mutateAsync: mutateUploadFileAsync,
    isPending: isPendingUploadFile,
  } = useMutation<
    UploadedMedia, // Type for successful response
    Error, // Type for error
    { file: File; folder?: string } // Type for input variables
  >({
    mutationFn: async (data) => {
      // The mutation function should be async and return the data
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("folder", data.folder || "general");

      const response = await mediaServices.upload(token, formData);
      const { path: filePath, fullUrl } = response.data.data;

      // Return the result, which will be the resolved value of the promise
      return { filePath, fullUrl };
    },
    onError: (error) => {
      errorToast(error);
    },
  });

  const deleteFile = async (filePath: string) => {
    const res = await mediaServices.remove(token, { filePath });
    if (res.data.status !== "success") {
      throw new Error(res.data.message || "Failed to delete file");
    }
    return res.data;
  };

  const {
    mutate: mutateDeleteFile,
    mutateAsync: mutateDeleteFileAsync,
    isPending: isPendingDeleteFile,
  } = useMutation({
    mutationFn: async (data: { filePath: string }) => deleteFile(data.filePath),
    onError: (error) => {
      errorToast(error);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  return {
    mutateUploadFile,
    mutateUploadFileAsync, // Return the async version
    isPendingUploadFile,
    mutateDeleteFile,
    mutateDeleteFileAsync,
    isPendingDeleteFile,
  };
};
