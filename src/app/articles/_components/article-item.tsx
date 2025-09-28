"use client";

import Image from "next/image";
import Link from "next/link";

import { generateText } from "@tiptap/react";

import { extensions } from "@/components/tiptap-templates/simple/extensions";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { blurDataURL } from "@/lib/blur-data-image-url";
import { Article } from "@/shared/interfaces/article.interface";

export default function ArticleItem({
  title,
  slug,
  author,
  content,
  coverUrl,
  categories,
  publishedAt,
}: Article) {
  const text = generateText(content, extensions);
  const coverImage = /^https?:\/\//.test(coverUrl!)
    ? coverUrl!
    : "/images/og.jpg";

  const authorFull = `${author.firstName} ${author.lastName}`;
  return (
    <div className="text-primary space-y-2 overflow-hidden">
      <div>
        <Image
          src={coverImage}
          alt={title}
          width={1280}
          height={720}
          quality={90}
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="aspect-video h-auto w-full rounded-md object-cover object-center"
        />
      </div>

      <div className="flex items-center gap-1 text-sm">
        <span>{authorFull}</span>
        <span>&#8226;</span>
        <span>
          {new Date(publishedAt!).toLocaleDateString("en-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <Tooltip>
        <TooltipTrigger className="text-left">
          <h4 className="line-clamp-2 text-lg font-semibold lg:text-xl">
            <Link href={`/articles/${slug}`}>{title}</Link>
          </h4>
        </TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>

      <p className="line-clamp-3 min-h-[72px] text-balance">{text}</p>

      <div className="flex items-center gap-2 text-sm">
        {categories.map((category, i) => (
          <span key={i} className="bg-primary/5 rounded-full border px-2 py-1">
            {category.name}
          </span>
        ))}
      </div>
    </div>
  );
}
