// mutations/upload-media-mutation.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { errorToast } from "@/lib/error-toast";
import { mediaServices } from "@/shared/media/media.service";

export const useMediaHandling = (token: string) => {
  const uploadFile = async (
    file: File,
    callback: (path: string, fullUrl: string) => void,
    folder?: string
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder || "general");

    const {
      data: {
        data: { path: filePath, fullUrl },
      },
    } = await mediaServices.upload(token, formData);

    return callback(filePath, fullUrl);
  };

  const { mutate: mutateUploadFile, isPending: isPendingUploadFile } =
    useMutation({
      mutationFn: async (data: {
        file: File;
        callback: (path: string, fileUrl: string) => void;
        folder?: string;
      }) => uploadFile(data.file, data.callback, data.folder),
      onError: (error) => {
        errorToast(error);
      },
    });

  const deleteFile = async (filePath: string, callback: () => void) => {
    const res = await mediaServices.remove(token, { filePath });
    if (res.data.status === "success") {
      callback();
    }
    return res.data;
  };

  const { mutate: mutateDeleteFile, isPending: isPendingDeleteFile } =
    useMutation({
      mutationFn: async (data: { filePath: string; callback: () => void }) =>
        deleteFile(data.filePath, data.callback),
      onError: (error) => {
        errorToast(error);
      },
      onSuccess: (data) => {
        toast.success(data.message);
      },
    });

  return {
    mutateUploadFile,
    mutateDeleteFile,
    isPendingUploadFile,
    isPendingDeleteFile,
  };
};
