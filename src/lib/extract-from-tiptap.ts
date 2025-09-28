import { ContentNode } from "@/shared/interfaces/article.interface";

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

export default extractTextFromTiptap;
