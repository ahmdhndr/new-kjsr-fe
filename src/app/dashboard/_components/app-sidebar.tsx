"use client";

import * as React from "react";

import { useSession } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { navDashboard } from "@/shared/constants/dashboard-menu";
import { Menu } from "@/shared/types/menu.type";
import { UserProfile } from "@/types/user-profile";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { SidebarLogo } from "./sidebar-logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const user = session?.user as UserProfile;

  let menuItems: Menu[] = [];

  const berandaItem = navDashboard.general.find(
    (item) => item.title === "Beranda"
  );
  const generalItems = navDashboard.general.find(
    (item) => item.title === "Umum"
  );
  if (user?.role === "admin") {
    menuItems = [berandaItem!, ...navDashboard.admin, generalItems!];
  } else {
    menuItems = [...navDashboard.general];
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={user} status={status} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
