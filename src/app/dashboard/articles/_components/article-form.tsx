"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { MultiSelect } from "@/components/multi-select";
import SidebarInsetComponent from "@/components/sidebar-inset-component";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import UploadFileInput from "@/components/upload-file-input";
import { useDebounce } from "@/hooks/use-debounce";
import { useMediaMutation } from "@/hooks/use-media-mutation";
import { Article, ContentNode } from "@/shared/interfaces/article.interface";
import { Category } from "@/shared/interfaces/category.interface";

import { useArticleFormSync } from "../_hooks/use-article-from-sync";
import useDeleteArticle from "../_hooks/use-delete-article";
import useSaveArticle from "../_hooks/use-save-article";
import useSubmitForReview from "../_hooks/use-submit-for-review";
import { TitleInput } from "./title-input";

export default function ArticleForm({
  token,
  categoryData,
  articleData,
}: {
  token: string;
  categoryData: Category[];
  articleData: Article;
}) {
  const { id } = useParams();

  const debounce = useDebounce();
  const {
    form,
    onSubmit,
    mutateSaveArticle,
    setArticle,
    title,
    setTitle,
    saveState,
    setSaveState,
  } = useSaveArticle(token);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);

  const [dataContent, setDataContent] = useState<ContentNode | undefined>(
    undefined
  );

  useArticleFormSync({
    id,
    form,
    articleData,
    setTitle,
    setDataContent,
    setSaveState,
    setArticle,
  });

  const value = form.watch("title");
  const ref = useRef<HTMLDivElement | null>(null);

  const {
    mutateUploadFile,
    mutateDeleteFileAsync,
    isPendingUploadFile,
    isPendingDeleteFile,
  } = useMediaMutation(token);

  const { mutateSubmitForReview, isPendingSubmitForReview } =
    useSubmitForReview(token);

  const { isPendingDeleteArticle, mutateDeleteArticle } =
    useDeleteArticle(token);

  useEffect(() => {
    if (ref.current) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(ref.current);
      range.collapse(false); // false = ke akhir
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [value]);

  useEffect(() => {
    if (categoryData) {
      const categoryOptions = categoryData.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setCategories(categoryOptions);
      if (articleData?.categories?.length && categoryData?.length) {
        const mappedIds = articleData.categories
          .map((c) => categoryData.find((cat) => cat.name === c.name)?.id)
          .filter(Boolean) as string[];

        form.setValue("categories", mappedIds);
      }
    }
  }, [categoryData, articleData, form]);

  return (
    <SidebarInsetComponent header={title} headerIcon={saveState}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* title & content */}
            <section className="space-y-4 md:col-span-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <TitleInput
                    initialTitle={field.value}
                    onTitleChange={(val) => {
                      field.onChange(val);
                      debounce(() => {
                        mutateSaveArticle({ ...form.getValues(), title: val });
                      }, 1000);
                    }}
                    placeholder="New title"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="coverUrl"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Cover Artikel</FormLabel>
                    <FormControl>
                      <UploadFileInput
                        isDropable
                        fileExist={field.value ?? ""}
                        onUpload={(files) => {
                          onChange(files);
                          if (files && files[0]) {
                            // const uploaded = await mutateUploadFile()
                            mutateUploadFile(
                              {
                                file: files[0],
                                folder: "articles",
                              },
                              {
                                onSuccess(data) {
                                  form.setValue("coverUrl", data.fullUrl);
                                  form.setValue("coverPath", data.filePath);
                                  debounce(() => {
                                    mutateSaveArticle({
                                      ...form.getValues(),
                                      coverUrl: data.fullUrl,
                                    });
                                  }, 1000);
                                },
                              }
                            );
                          }
                        }}
                        isUploading={isPendingUploadFile}
                        isDeleting={isPendingDeleteFile}
                        onDelete={async () => {
                          const filePath = form.getValues("coverPath");
                          if (typeof filePath === "string") {
                            await mutateDeleteFileAsync({ filePath });
                            form.setValue("coverUrl", "");
                            form.setValue("coverPath", "");
                          }
                        }}
                        acceptedFileType="image"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <SimpleEditor
                    token={token}
                    value={dataContent}
                    onChange={(val) => {
                      field.onChange(val);
                      debounce(() => {
                        mutateSaveArticle({
                          ...form.getValues(),
                          content: val,
                        });
                      }, 10000);
                    }}
                  />
                )}
              />
            </section>
            {/* cover, category, tombol aksi */}
            <section className="sticky w-full space-y-4 md:col-span-1">
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <MultiSelect
                      options={categories}
                      onValueChange={(val) => {
                        field.onChange(val);
                        debounce(() => {
                          mutateSaveArticle({
                            ...form.getValues(),
                            categories: val,
                          });
                        }, 1000);
                      }}
                      defaultValue={field.value}
                    />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Button
                  type="button"
                  className="w-full"
                  disabled={isPendingSubmitForReview}
                  onClick={() => mutateSubmitForReview(articleData.id!)}
                >
                  Submit Article
                </Button>
                <Button
                  variant={"outline-destructive"}
                  type="button"
                  className="w-full"
                  disabled={isPendingDeleteArticle}
                  onClick={() => mutateDeleteArticle(articleData.id!)}
                >
                  Delete Article
                </Button>
              </div>
            </section>
          </div>
        </form>
      </Form>
    </SidebarInsetComponent>
  );
}
