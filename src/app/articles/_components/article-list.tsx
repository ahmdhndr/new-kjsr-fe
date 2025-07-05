import { articles } from "@/data/articles";

import ArticleItem from "./article-item";

type Props = {
  sliceStart?: number;
  sliceEnd?: number;
};

export default function ArticleList({ sliceStart = 0, sliceEnd = 5 }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(sliceStart, sliceEnd)
        .map((article) => (
          <ArticleItem key={article.id} {...article} />
        ))}
    </div>
  );
}
