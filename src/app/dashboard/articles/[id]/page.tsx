import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { SessionExtended } from "@/app/(auth)/_types/auth";
import { authOptions } from "@/lib/auth";
import { articleServices } from "@/shared/services/article.service";

import { categoryServices } from "../../admin/categories/_services/category.service";
import ArticleForm from "../_components/article-form";

type Params = Promise<{ id: string }>;

export default async function CreateArticlePage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const session: SessionExtended | null = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const categoryData = await categoryServices.findAllCategory("");
  const categories = categoryData.data.data.list;
  const { data: detailArticle } = await articleServices.getDetailArticleByUser(
    session.accessToken!,
    id
  );

  return (
    <ArticleForm
      token={session.accessToken!}
      categoryData={categories}
      articleData={detailArticle.data}
    />
  );
}
