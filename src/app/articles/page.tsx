import { Metadata } from "next";

import Navbar from "@/components/navbar";
import { buildURLParams } from "@/lib/build-params";
import { ArticlePaginationInterface } from "@/shared/interfaces/pagination.interface";
import { articleServices } from "@/shared/services/article.service";

import { categoryServices } from "../dashboard/admin/categories/_services/category.service";
import ArticleCategoryList from "./_components/article-category-list";
import ArticleList from "./_components/article-list";
import ArticlePagination from "./_components/article-pagination";

type SearchParams = Promise<ArticlePaginationInterface>;
export const metadata: Metadata = {
  title: "Daftar Artikel",
};

export default async function ArticlePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, search, category } = await searchParams;
  const paginateQuery = buildURLParams({
    page: page ?? 1,
    limit: 10,
    search: search ?? "",
    category: category ?? "",
  });

  const { data: articleResult } =
    await articleServices.listArticle(paginateQuery);
  const { data: resultCategory } = await categoryServices.findAllCategory("");

  const { list: articles, meta } = articleResult.data;
  const { list: categories } = resultCategory.data;

  return (
    <>
      <Navbar />
      <div className="my-8 text-center">
        <h1 className="text-red-kjsr text-3xl font-bold uppercase lg:text-5xl">
          The Article
        </h1>
      </div>
      <div className="container space-y-4">
        <ArticleCategoryList categories={categories} />
        <ArticleList articles={articles} />
        {articles.length > 0 && <ArticlePagination meta={meta} />}
      </div>
    </>
  );
}
