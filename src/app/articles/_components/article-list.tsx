// import { articles } from "@/data/articles";
import { Article } from "@/shared/interfaces/article.interface";

import ArticleItem from "./article-item";

type Props = {
  articles: Article[];
  sliceStart?: number;
  sliceEnd?: number;
};

export default function ArticleList({
  articles,
  sliceStart = 0,
  sliceEnd = 5,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.length > 0 ? (
        articles
          .sort(
            (a, b) =>
              new Date(b.publishedAt!).getTime() -
              new Date(a.publishedAt!).getTime()
          )
          .slice(sliceStart, sliceEnd)
          .map((article) => <ArticleItem key={article.id} {...article} />)
      ) : (
        <span>Artikel tidak ditemukan</span>
      )}
    </div>
  );
}
