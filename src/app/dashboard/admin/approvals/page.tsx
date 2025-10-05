import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import SidebarInsetComponent from "@/components/sidebar-inset-component";
import { authOptions } from "@/lib/auth";
import { UserProfile } from "@/types/user-profile";

import PreapprovalTable from "./_components/preapproval-table";

export const metadata: Metadata = {
  title: "Pengajuan Akun",
};

export default async function PreapprovalPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const { accessToken } = session.user as UserProfile;

  return (
    <SidebarInsetComponent header="Daftar Pengajuan Akun">
      <section>
        <p className="text-sm font-normal">
          Daftar Akun yang memerlukan persetujuan
        </p>
      </section>

      <section>
        <PreapprovalTable token={accessToken} />
      </section>
    </SidebarInsetComponent>
  );
}
