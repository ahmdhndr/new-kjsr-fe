"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react";

import { menus } from "@/data/menus";
import { cn } from "@/lib/utils";
import { UserProfile } from "@/types/user-profile";

import BrandLogo from "../brand-logo";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import NavbarMobile from "./navbar-mobile";
import ProfileMenu from "./profile-menu";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full shadow-md backdrop-blur">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center gap-2">
          <NavbarMobile />
          <div className="mr-4 hidden lg:flex">
            <BrandLogo />

            <nav className="flex items-center gap-4 text-sm xl:gap-6">
              {menus.map((item) => (
                <Link href={item.href} key={item.name} passHref legacyBehavior>
                  <a
                    href={item.href}
                    className={cn(
                      // base style
                      "text-primary/80 hover:text-primary relative transition-colors",
                      // underline effect
                      "after:bg-red-kjsr after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transform-gpu after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100",
                      // active state
                      item.href === pathname &&
                        "text-primary font-semibold after:scale-x-100"
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between gap-2 lg:justify-end">
            <div className="block lg:hidden">
              <BrandLogo />
            </div>
            <nav className="flex items-center gap-2">
              {status == "loading" ? (
                <Skeleton className="h-9 w-20 bg-gray-300" />
              ) : session ? (
                <ProfileMenu {...(session.user as UserProfile)} />
              ) : (
                <Button asChild className="text-white-kjsr">
                  <Link href="/login">Masuk</Link>
                </Button>
              )}
              {/* )} */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
