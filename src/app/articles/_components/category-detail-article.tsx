"use client";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Category } from "@/shared/interfaces/category.interface";

export default function CategoryDetailArticle({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <>
      {categories.length > 0 ? (
        <div className="flex items-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={"outline"}
              className="bg-primary/20"
              onClick={() =>
                redirect(
                  `/articles?page=1&limit=10&search=&category=${category.name.toLowerCase()}`
                )
              }
            >
              {category.name}
            </Button>
          ))}
        </div>
      ) : (
        <Button
          variant={"outline"}
          className="bg-primary/20 pointer-events-none"
        >
          Uncategorized
        </Button>
      )}
    </>
  );
}
