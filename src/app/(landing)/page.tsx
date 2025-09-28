import { buildURLParams } from "@/lib/build-params";
import { QueryPaginationInterface } from "@/shared/interfaces/pagination.interface";
import { articleServices } from "@/shared/services/article.service";

import HomeComponent from "./home-component";

type SearchParams = Promise<QueryPaginationInterface>;

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
  const { data: articles } = await articleServices.listArticle(paginateQuery);

  return (
    <>
      <HomeComponent articles={articles.data.list} />
    </>
  );
}
