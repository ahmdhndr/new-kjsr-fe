import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

import { getServerSession } from "next-auth";

import { SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/auth";
import { env } from "@/lib/env/client";

import { AppSidebar } from "./_components/app-sidebar";
import DashboardLayoutClient from "./dashboard-layout-client";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const callbackUrl = encodeURIComponent(
    `${env.NEXT_PUBLIC_BASE_URL}/dashboard`
  );

  if (!session) {
    redirect(`/login?callbackUrl=${callbackUrl}`);
  }

  return (
    <SidebarProvider className="text-primary">
      <AppSidebar />
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </SidebarProvider>
  );
}
