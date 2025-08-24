"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { UserProfile } from "@/types/user-profile";

export function NavUser({
  session,
  status,
}: {
  session?: UserProfile;
  status?: "loading" | "authenticated" | "unauthenticated";
}) {
  const { isMobile } = useSidebar();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <div className="grid flex-1 space-y-1 text-left text-sm leading-tight">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-2 w-full" />
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session;
  const avatarFallback = user?.firstName?.charAt(0).toUpperCase() || "G";
  const fullName = `${capitalizeFirstLetter(user?.firstName)} ${capitalizeFirstLetter(user?.lastName)}`;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-primary data-[state=open]:text-sidebar-primary-foreground group-data-[collapsible=icon]:p-0!"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar as string} alt={fullName} />
                <AvatarFallback className="rounded-lg">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{fullName}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar as string} alt={fullName} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{fullName}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hover:bg-primary hover:text-white-kjsr cursor-pointer"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
