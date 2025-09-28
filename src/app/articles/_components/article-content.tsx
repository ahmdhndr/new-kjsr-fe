"use client";

import { generateHTML } from "@tiptap/react";

import { extensions } from "@/components/tiptap-templates/simple/extensions";
import { ContentNode } from "@/shared/interfaces/article.interface";

export default function ArticleContent({ content }: { content: ContentNode }) {
  const html = generateHTML(content, extensions);

  return (
    <div
      className="prose prose-p:text-primary prose-strong:text-primary prose-img:rounded-md mb-5 pt-5"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
