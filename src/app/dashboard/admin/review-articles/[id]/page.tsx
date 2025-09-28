import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import SidebarInsetComponent from "@/components/sidebar-inset-component";
import { authOptions } from "@/lib/auth";
import { articleServices } from "@/shared/services/article.service";

import ArticleDetail from "../_components/article-detail";

type Params = Promise<{ id: string }>;

export default async function CreateArticlePage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const { data: articleResult } = await articleServices.detailArticleReview(
    session.accessToken!,
    id
  );
  const article = articleResult.data;

  return (
    <SidebarInsetComponent header={`Review: ${article.title}`}>
      <ArticleDetail article={article} token={session.accessToken!} />
    </SidebarInsetComponent>
  );
}
