"use client";

import Image from "next/image";
import Link from "next/link";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function SidebarLogo() {
  return (
    <Link href={"/"}>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center gap-2">
          <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Image
              src="/logo-bg-transparan.png"
              alt="Logo KJSR"
              width={30}
              height={30}
              className="size-6"
            />
          </div>
          <div className="text-primary grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">KJSR Indonesia</span>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </Link>
  );
}
