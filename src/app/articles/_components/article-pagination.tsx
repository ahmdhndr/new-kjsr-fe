"use client";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { getVisiblePages } from "@/components/datatable/get-visible-pages";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MetaPagination } from "@/shared/interfaces/pagination.interface";

import useGetArticles from "../_hooks/use-get-articles";

export default function ArticlePagination({ meta }: { meta: MetaPagination }) {
  const { handleChangePage, currentPage } = useGetArticles();

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        className="bg-gray-100"
        size="sm"
        onClick={() => handleChangePage(Number(currentPage) - 1)}
        disabled={Number(currentPage) === 1}
      >
        <MdOutlineKeyboardArrowLeft />
      </Button>

      {getVisiblePages(Number(currentPage), meta.totalPages).map((page, i) =>
        typeof page === "string" ? (
          <Button
            disabled
            variant="outline"
            key={`ellipsis-${i}`}
            className="bg-gray-100 p-4"
          >
            {page}
          </Button>
        ) : (
          <Button
            key={`page-${page}`}
            variant={Number(currentPage) === page ? "default" : "outline"}
            className={cn(
              "p-4",
              Number(currentPage) === page
                ? "bg-primary text-white"
                : "bg-gray-100"
            )}
            size="sm"
            onClick={() => handleChangePage(page)}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="outline"
        className="bg-gray-100"
        size="sm"
        onClick={() => handleChangePage(Number(currentPage) + 1)}
        disabled={Number(currentPage) >= meta.totalPages}
      >
        <MdOutlineKeyboardArrowRight />
      </Button>
    </div>
  );
}
