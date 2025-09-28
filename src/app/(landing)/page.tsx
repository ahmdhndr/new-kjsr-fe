import { articleServices } from "@/shared/services/article.service";

import HomeComponent from "./home-component";

export default async function Home() {
  const { data: articles } = await articleServices.listArticle({});

  return (
    <>
      <HomeComponent articles={articles.data.list} />
    </>
  );
}
