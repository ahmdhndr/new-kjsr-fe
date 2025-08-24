"use client";

import Image from "next/image";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { Loader2 } from "lucide-react";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import { blurDataURL } from "@/lib/blur-data-image-url";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface UploadFileInputProps {
  name: string;
  className?: string;
  isDropable?: boolean;
  onUpload?: (files?: FileList) => void;
  onDelete?: () => Promise<void>;
  isUploading?: boolean;
  isDeleting?: boolean;
  acceptedFileType?: "pdf" | "image";
  fileExist?: string;
}

export default function UploadFileInput({
  name,
  className,
  isDropable = false,
  isUploading = false,
  isDeleting = false,
  onUpload,
  onDelete,
  acceptedFileType = "image",
  fileExist = "",
}: UploadFileInputProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();
  const [acceptedFiles, setAcceptedFiles] = useState<string>("");
  const [textAcceptedFile, setTextAcceptedFile] = useState<string>("");

  useEffect(() => {
    if (uploadedFile) {
      setPreviewUrl(URL.createObjectURL(uploadedFile));
      setPreviewName(uploadedFile.name);
    } else if (fileExist) {
      setPreviewUrl(fileExist);
      const fileName = fileExist.split("/").pop();
      setPreviewName(fileName!);
    } else {
      setPreviewUrl(null);
      setPreviewName("");
    }
  }, [fileExist, uploadedFile]);

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      if (isDropable) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [isDropable]
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files && onUpload) {
        setUploadedFile(files[0]);
        onUpload(files);
      }
    },
    [onUpload]
  );

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      setUploadedFile(files[0]);
      onUpload(files);
    }
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);
    }

    return () => {
      dropCurrent?.removeEventListener("dragover", handleDragOver);
      dropCurrent?.removeEventListener("drop", handleDrop);
    };
  }, [handleDragOver, handleDrop]);

  useEffect(() => {
    switch (acceptedFileType) {
      case "pdf":
        setAcceptedFiles(".pdf");
        setTextAcceptedFile("PDF");
        break;
      default:
        setAcceptedFiles("image/*");
        setTextAcceptedFile("JPEG, PNG, SVG");
    }
  }, [acceptedFileType]);

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete();
    }
    setUploadedFile(null);
    setPreviewUrl(null);
  };

  return (
    <section className="w-full space-y-2">
      <label
        ref={drop}
        htmlFor={`upload-file-${dropzoneId}`}
        className={cn(
          "border-primary flex min-h-24 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 p-1 hover:bg-gray-100",
          previewUrl ? "pointer-events-none" : "cursor-pointer",
          className
        )}
      >
        <Input
          type="file"
          className="hidden"
          disabled={Boolean(previewUrl)}
          onChange={handleOnUpload}
          accept={acceptedFiles}
          name={name}
          id={`upload-file-${dropzoneId}`}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <IoMdCloudUpload className="text-primary h-10 w-10" />
          <div className="flex flex-col items-center justify-center gap-1 text-sm text-gray-500">
            {isDropable ? (
              <span>Drag and Drop or Click to upload a file</span>
            ) : (
              <span>Click to upload a file</span>
            )}
            <span className="text-xs">
              Accepted file types: {textAcceptedFile}
            </span>
          </div>
        </div>
      </label>
      <h3 className="text-sm">Preview</h3>
      <div className="flex w-full flex-col items-start gap-1">
        {previewUrl ? (
          <div className="relative flex w-full items-center gap-2 rounded-lg border p-2">
            <div className="relative h-10 w-10">
              <Image
                fill
                src={previewUrl}
                alt={previewName || "Preview Icon"}
                className="object-contain"
                sizes="40px"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              {isUploading ? (
                <div className="flex items-center gap-1 text-gray-500">
                  <span className="text-sm">Uploading Icon</span>
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : (
                previewName && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-block w-fit max-w-52 truncate text-sm">
                        <span className="text-sm">{previewName}</span>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs break-words">
                      <span>{previewName}</span>
                    </TooltipContent>
                  </Tooltip>
                )
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting || isUploading}
            >
              {isDeleting ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <MdDelete className="text-destructive h-8 w-8" />
              )}
            </Button>
          </div>
        ) : (
          <span className="text-sm text-gray-500">No file uploaded.</span>
        )}
      </div>
    </section>
  );
}
