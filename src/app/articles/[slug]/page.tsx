import { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { blurDataURL } from "@/lib/blur-data-image-url";
import { Article, ContentNode } from "@/shared/interfaces/article.interface";
import { articleServices } from "@/shared/services/article.service";

import ArticleContent from "../_components/article-content";
import CategoryDetailArticle from "../_components/category-detail-article";

type Params = Promise<{ slug: string }>;

function extractTextFromTiptap(node: ContentNode): string {
  if (!node)
    return "Klub Jantung Sehat Remaja (KJSR) Indonesia adalah salah satu program yang dijalankan di bawah naungan Yayasan Jantung Indonesia (YJI).";

  if (node.type === "text" && typeof node.text === "string") {
    return node.text;
  }

  // kalau node punya children
  if (Array.isArray(node.content)) {
    return node.content.map(extractTextFromTiptap).join(" ");
  }

  return "Klub Jantung Sehat Remaja (KJSR) Indonesia adalah salah satu program yang dijalankan di bawah naungan Yayasan Jantung Indonesia (YJI).";
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: articleResult } = await articleServices.getDetailArticle(slug);

  const article = articleResult.data;

  const coverImage = /^https?:\/\//.test(article.coverUrl!)
    ? article.coverUrl
    : "/images/og.jpg";
  const author = `${article.author.firstName} ${article.author.lastName}`;
  const articleJson = article.content;
  const description = extractTextFromTiptap(articleJson).slice(0, 200);

  return {
    title: article.title,
    description,
    authors: [{ name: author }],
    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [author],
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: `Cover ${article.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [coverImage],
    },
  };
}

export default async function ArticleSlugPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { data: articleResult } = await articleServices.getDetailArticle(slug);

  const article: Article = articleResult.data;
  const coverImage = /^https?:\/\//.test(article.coverUrl!)
    ? article.coverUrl
    : "/images/og.jpg";
  const author = `${article.author.firstName} ${article.author.lastName}`;

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
              alt={`Cover ${article.title}`}
              className="object-cover"
              sizes="100%"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
          <div className="flex flex-col gap-4">
            {/* Category */}
            <CategoryDetailArticle categories={article.categories} />

            {/* Title */}
            <h1 className="text-xl font-bold lg:text-3xl">{article.title}</h1>

            {/* TODO: clickable redirect to blog with the author */}
            {/* Author */}
            <div className="flex items-center gap-2">
              <h4>{author}</h4>
              <span>|</span>
              <span>
                {new Date(article.publishedAt!).toLocaleDateString("en-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ArticleContent content={article.content} />
          </div>
          {/* <div className="bg-red-kjsr">Belum tau buat apa</div> */}
        </div>
      </div>

      <Footer />
    </>
  );
}
