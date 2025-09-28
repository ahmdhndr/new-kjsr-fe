"use client";

import Link from "next/link";
import { useEffect } from "react";

import { ColumnDef } from "@tanstack/react-table";

import DataTable from "@/components/datatable";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Article, ArticleStatus } from "@/shared/interfaces/article.interface";

import useCreateArticle from "../_hooks/use-create-article";
import useListArticle from "../_hooks/use-list-article";

export default function ArticleTable({ token }: { token: string }) {
  const {
    articleData,
    currentPage,
    currentLimit,
    currentSearch,
    isLoadingArticle,
    isRefetchingArticle,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
    setURL,
  } = useListArticle(token);

  const { mutateCreateArticle, isPendingCreateArticle } =
    useCreateArticle(token);

  const columns: ColumnDef<Article>[] = [
    {
      accessorKey: "title",
      header: "Judul",
      cell: ({ row }) => {
        const article = row.original;

        return (
          <Tooltip>
            <TooltipTrigger>
              <div className="line-clamp-1 w-full max-w-[450px] text-ellipsis lg:max-w-full">
                {article.title}
              </div>
            </TooltipTrigger>
            <TooltipContent>{article.title}</TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const article = row.original;

        switch (article.status) {
          case ArticleStatus.IN_REVIEW:
            return (
              <div className="w-fit rounded-sm border border-yellow-500 bg-yellow-500/10 p-1 text-yellow-500">
                In Review
              </div>
            );
          case ArticleStatus.PUBLISHED:
            return (
              <div className="w-fit rounded-sm border border-emerald-500 bg-emerald-500/10 p-1 text-emerald-500">
                Published
              </div>
            );
          case ArticleStatus.NEEDS_REVISION:
            return (
              <div className="border-red-kjsr bg-red-kjsr/10 text-red-kjsr w-fit rounded-sm border p-1">
                Need Changes
              </div>
            );
          default:
            return (
              <div className="w-fit rounded-sm border border-gray-500 bg-gray-500/10 p-1 text-gray-500">
                Draft
              </div>
            );
        }
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const article = row.original;

        return (
          <Button asChild>
            <Link href={`/dashboard/articles/${article.id}`}>Detail</Link>
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    if (!currentPage || !currentLimit) {
      setURL();
    }
  }, [currentPage, currentLimit, setURL]);

  return (
    <>
      <DataTable
        loading={isLoadingArticle || isRefetchingArticle}
        columns={columns}
        data={articleData?.list as Article[]}
        totalPages={articleData?.meta.totalPages as number}
        currentPage={Number(currentPage)}
        onChangePage={handleChangePage}
        valueLimit={currentLimit || "4"}
        onChangeLimit={handleChangeLimit}
        valueInput={currentSearch || ""}
        onChangeSearch={handleChangeSearch}
        buttonTopContent={
          <div className="flex flex-col gap-1 md:flex-row">
            <Button
              size="sm"
              onClick={() => mutateCreateArticle()}
              disabled={isPendingCreateArticle}
            >
              Create Article
            </Button>
          </div>
        }
      />
    </>
  );
}
