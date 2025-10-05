"use client";

import Image from "next/image";

import ArticleContent from "@/app/articles/_components/article-content";
import ArticleCategoryList from "@/app/articles/_components/category-detail-article";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { blurDataURL } from "@/lib/blur-data-image-url";
import { Article } from "@/shared/interfaces/article.interface";

import useReviewArticle from "../_hooks/use-review-article";
import { ActionEnum } from "../_schema/review-article.schema";

export type ArticleDetailProps = {
  article: Article;
  token: string;
};

export default function ArticleDetail({ token, article }: ArticleDetailProps) {
  const { id, title, author, content, coverUrl, categories, updatedAt } =
    article;
  const coverImage = /^https?:\/\//.test(coverUrl!)
    ? coverUrl
    : "/images/og.jpg";

  const fullnameAuthor = `${author.firstName} ${author.lastName}`;

  const { form, onSubmit, isPendingSubmitReviewArticle } = useReviewArticle(
    token,
    id!
  );

  return (
    <div className="container grid grid-cols-1 gap-4 pt-4">
      {/* Cover & Additional */}
      <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
        <div className="relative aspect-video max-h-[375px] w-full overflow-hidden rounded-lg">
          <Image
            fill
            src={coverImage!}
            alt={`Cover ${title}`}
            className="object-cover"
            sizes="100%"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
        <div className="flex flex-col gap-4">
          {/* Category */}
          {/* TODO: clickable category */}
          <ArticleCategoryList categories={categories} />

          {/* Title */}
          <h1 className="text-xl font-bold lg:text-3xl">{title}</h1>

          {/* TODO: clickable redirect to blog with the author */}
          {/* Author */}
          <div className="flex items-center gap-2">
            <h4>{fullnameAuthor}</h4>
            <span>|</span>
            <span>
              {new Date(updatedAt!).toLocaleDateString("en-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ArticleContent content={content} />
        </div>

        <div className="pt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aksi</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih aksi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        <SelectItem value={ActionEnum.APPROVED}>
                          Approve
                        </SelectItem>
                        <SelectItem value={ActionEnum.NEED_REVISION}>
                          Need Revision
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catatan</FormLabel>
                    <FormControl>
                      <Textarea onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isPendingSubmitReviewArticle}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
