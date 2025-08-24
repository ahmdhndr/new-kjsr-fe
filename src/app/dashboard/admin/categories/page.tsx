import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { UserProfile } from "@/types/user-profile";

import SidebarInsetComponent from "../../_components/sidebar-inset-component";
import CategoryTable from "./_components/category-table";

export default async function CategoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }
  const user = session.user as UserProfile;

  return (
    <SidebarInsetComponent header="Kategori">
      <section>
        {/* <h1 className="text-3xl font-bold">Category</h1> */}
        <p className="text-sm font-normal">
          List of all categories, create new category, and manage existing
          categories.
        </p>
      </section>

      <section>
        <CategoryTable token={user?.accessToken} />
      </section>
    </SidebarInsetComponent>
  );
}
