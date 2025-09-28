import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import SidebarInsetComponent from "@/components/sidebar-inset-component";
import { authOptions } from "@/lib/auth";
import { UserProfile } from "@/types/user-profile";

import ArticleReviewTable from "./_components/article-review-table";

export const metadata: Metadata = {
  title: "Review Article",
};

export default async function CategoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const user = session.user as UserProfile;

  return (
    <SidebarInsetComponent header="Review Article">
      <section>
        <p className="text-sm font-normal">
          Daftar Artikel yang memerlukan persetujuan
        </p>
      </section>

      <section>
        <ArticleReviewTable token={user.accessToken} />
      </section>
    </SidebarInsetComponent>
  );
}
