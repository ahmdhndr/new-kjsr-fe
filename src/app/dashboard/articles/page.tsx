import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import SidebarInsetComponent from "@/components/sidebar-inset-component";
import { authOptions } from "@/lib/auth";
import { UserProfile } from "@/types/user-profile";

import ArticleTable from "./_components/article-table";

export default async function ArticlePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }
  const user = session.user as UserProfile;

  return (
    <SidebarInsetComponent header="Artikel">
      <section>
        <p className="text-sm font-normal">Pengaturan artikel</p>
      </section>

      <section>
        <ArticleTable token={user.accessToken} />
      </section>
    </SidebarInsetComponent>
  );
}
