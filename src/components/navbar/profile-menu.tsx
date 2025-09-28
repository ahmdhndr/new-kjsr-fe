"use client";

import Link from "next/link";

import { Loader2, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { UserProfile } from "@/types/user-profile";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function ProfileMenu({
  firstName,
  lastName,
  avatar,
}: UserProfile) {
  const { data, status } = useSession();

  if (status === "loading") {
    return <Loader2 className="size-5 animate-spin" />;
  }

  if (!data) {
    return null;
  }

  const avatarFallback = firstName?.charAt(0).toUpperCase() || "T";
  const fullName = `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName)}`;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        asChild
        className="relative cursor-pointer outline-none"
      >
        <Avatar className="size-8 transition hover:opacity-75">
          <AvatarImage src={avatar as string} alt={fullName as string} />
          <AvatarFallback className="bg-primary text-background">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="w-60">
        <DropdownMenuItem className="truncate">
          Hello, <span className="text-primary font-semibold">{fullName}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:bg-primary hover:text-background cursor-pointer transition-colors">
          <Link href={"/dashboard"} className="w-full">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
