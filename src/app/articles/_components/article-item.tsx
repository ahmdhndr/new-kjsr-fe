import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { blurDataURL } from "@/lib/blur-data-image-url";

import { ArticleDTO } from "../_dtos/article.dto";

export default function ArticleItem({
  title,
  slug,
  excerpt,
  author,
  image_url,
  categories,
  created_at,
}: ArticleDTO) {
  const imageUrl = image_url ? image_url : "/images/og.jpg";
  return (
    <div className="text-primary space-y-2 overflow-hidden">
      <div>
        <Image
          src={imageUrl}
          alt={title}
          width={1280}
          height={720}
          quality={90}
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="block aspect-video h-full object-cover object-center"
        />
      </div>

      <div className="flex items-center gap-1 text-sm">
        <span>{author}</span>
        <span>&#8226;</span>
        <span>
          {created_at.toLocaleDateString("en-ID", {
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

      <p className="line-clamp-3 min-h-[72px] text-balance">{excerpt}</p>

      <div className="flex items-center gap-2 text-sm">
        {categories.map((category, i) => (
          <span key={i} className="bg-primary/5 rounded-full border px-2 py-1">
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
