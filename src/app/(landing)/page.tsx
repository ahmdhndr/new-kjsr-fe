import { buildURLParams } from "@/lib/build-params";
import { ArticlePaginationInterface } from "@/shared/interfaces/pagination.interface";
import { articleServices } from "@/shared/services/article.service";

import HomeComponent from "./home-component";

type SearchParams = Promise<ArticlePaginationInterface>;

export default async function Home({
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

  const { list: articles } = articleResult.data;

  return <HomeComponent articles={articles} />;
}
