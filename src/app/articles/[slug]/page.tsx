import Image from "next/image";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { blurDataURL } from "@/lib/blur-data-image-url";
import { Article } from "@/shared/interfaces/article.interface";
import { articleServices } from "@/shared/services/article.service";

import ArticleContent from "../_components/article-content";
import CategoryDetailArticle from "../_components/category-detail-article";

type Params = Promise<{ slug: string }>;

export default async function ArticleSlugPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { data: article } = await articleServices.getDetailArticle(slug);

  const articleData: Article = article.data;
  const coverImage = /^https?:\/\//.test(articleData.coverUrl!)
    ? articleData.coverUrl
    : "/images/og.jpg";
  const author = `${articleData.author.firstName} ${articleData.author.lastName}`;

  return (
    <>
      <Navbar />

      <div className="container grid grid-cols-1 gap-4 pt-4">
        {/* Cover & Additional */}
        <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
          <div className="relative aspect-video max-h-[375px] w-full overflow-hidden rounded-lg">
            <Image
              fill
              src={coverImage!}
              alt={`Cover ${articleData.title}`}
              className="object-cover"
              sizes="100%"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
          <div className="flex flex-col gap-4">
            {/* Category */}
            <CategoryDetailArticle categories={articleData.categories} />

            {/* Title */}
            <h1 className="text-xl font-bold lg:text-3xl">
              {articleData.title}
            </h1>

            {/* TODO: clickable redirect to blog with the author */}
            {/* Author */}
            <div className="flex items-center gap-2">
              <h4>{author}</h4>
              <span>|</span>
              <span>
                {new Date(articleData.publishedAt!).toLocaleDateString(
                  "en-ID",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ArticleContent content={articleData.content} />
          </div>
          {/* <div className="bg-red-kjsr">Belum tau buat apa</div> */}
        </div>
      </div>

      <Footer />
    </>
  );
}
