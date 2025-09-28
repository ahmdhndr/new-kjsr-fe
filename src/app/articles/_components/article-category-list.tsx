"use client";

import { redirect, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/shared/interfaces/category.interface";

import useGetArticles from "../_hooks/use-get-articles";

export default function ArticleCategoryList({
  categories,
}: {
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const getCategory = searchParams.get("category");
  const { handleChangeCategory } = useGetArticles();

  return (
    <div className="flex w-full items-center gap-4 overflow-x-auto p-1">
      <Button
        variant={"outline"}
        className={cn(
          "hover:bg-primary/20",
          (getCategory === "" || getCategory === null) && "bg-primary/20"
        )}
        onClick={() => redirect("/articles?page=1&limit=10&search=&category=")}
      >
        All
      </Button>
      {categories.map((category: Category) => {
        const categoryNameLower = category.name.toLowerCase();
        return (
          <div key={category.id}>
            <Button
              variant={"outline"}
              className={cn(
                "hover:bg-primary/20",
                getCategory?.toLowerCase() === categoryNameLower &&
                  "bg-primary/20"
              )}
              onClick={() => handleChangeCategory(categoryNameLower)}
            >
              {category.name}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
