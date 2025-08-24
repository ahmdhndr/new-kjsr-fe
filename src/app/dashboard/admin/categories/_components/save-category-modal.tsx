"use client";

import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import UploadFileInput from "@/components/upload-file-input";
import { useModal } from "@/context/modal-context";
import { cn } from "@/lib/utils";

import useSaveCategory from "../_hooks/use-save-category";
import { TCategory } from "./category-table";

interface SaveCategoryModalProps {
  token: string;
  className?: string;
  action: "add" | "edit";
  data: TCategory | null;
}

export default function SaveCategoryModal({
  token,
  className,
  action,
  data,
}: SaveCategoryModalProps) {
  const {
    form,
    onSubmit,
    handleUploadIcon,
    handleDeleteIcon,
    isPendingSaveCategory,
    isPendingUploadFile,
    isPendingDeleteFile,
  } = useSaveCategory(token, action, data);
  const { close } = useModal();
  const [dataEdit, setDataEdit] = useState<TCategory | null>();

  // useEffect(() => {
  //   if (data) {
  //     setDataEdit(data);
  //   } else {
  //     setDataEdit(null);
  //   }
  // }, [data]);

  useEffect(() => {
    if (action === "edit" && data) {
      setDataEdit(data);
      form.setValue("name", data?.name);
      form.setValue("description", data?.description);
      form.setValue("iconUrl", data?.iconUrl);
      form.setValue("iconPath", data?.iconPath);
    } else if (action === "add") {
      setDataEdit(null);
      form.reset();
    }
  }, [data, action, form]);

  return (
    <ResponsiveDialog
      modalKey={action === "edit" ? "edit-category" : "add-category"}
      title={action === "edit" ? `Edit ${dataEdit?.name}` : "Add Category"}
      className="max-h-[575px] overflow-y-auto md:max-w-sm"
    >
      <ScrollArea>
        <div
          className={cn(
            "grid w-full max-w-[768px] items-start gap-4 px-1",
            className
          )}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`${Object.keys(form.formState.errors).length > 0 ? "space-y-1" : "space-y-4"}`}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Information</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus
                        type="text"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="iconUrl"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <UploadFileInput
                        isDropable
                        fileExist={dataEdit?.iconUrl}
                        onUpload={(files) => {
                          if (files) {
                            handleUploadIcon(files, onChange);
                          }
                        }}
                        isUploading={isPendingUploadFile}
                        isDeleting={isPendingDeleteFile}
                        onDelete={async () => await handleDeleteIcon(onChange)}
                        acceptedFileType="image"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={
                  isPendingSaveCategory ||
                  isPendingUploadFile ||
                  isPendingDeleteFile
                }
                type="submit"
                variant="default"
                className="w-full"
              >
                {isPendingSaveCategory ? (
                  <Loader2 className="animate-spin" />
                ) : action === "edit" ? (
                  "Update Category"
                ) : (
                  "Create Category"
                )}
              </Button>
              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  form.reset();
                  close();
                }}
              >
                Cancel
              </Button>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </ResponsiveDialog>
  );
}
