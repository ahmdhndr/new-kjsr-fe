import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import SidebarInsetComponent from "@/components/sidebar-inset-component";
import { authOptions } from "@/lib/auth";

export default async function ArticlesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  return (
    <SidebarInsetComponent header="Review Article">
      <section>
        <p className="text-sm font-normal">
          Daftar Artikel yang memerlukan persetujuan
        </p>
      </section>

      <section>Halo</section>
    </SidebarInsetComponent>
  );
}
