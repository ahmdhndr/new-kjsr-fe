"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Menu } from "@/shared/types/menu.type";

export function NavMain({ items }: { items: Menu[] }) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarGroup className="text-primary">
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;

        return hasChildren ? (
          <div key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarMenu>
              {item.children!.map((child) => {
                const hasSubChildren =
                  child.children && child.children.length > 0;

                return hasSubChildren ? (
                  <Collapsible
                    key={child.title}
                    asChild
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={child.title}
                          className="cursor-pointer overflow-hidden"
                          isActive={pathname === child.url}
                          onClick={
                            isMobile ? () => setOpenMobile(false) : undefined
                          }
                        >
                          {child.icon && <child.icon className="size-10" />}
                          <span className="font-semibold">{child.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {child.children?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className="text-primary"
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={child.title}>
                    <SidebarMenuButton
                      asChild
                      className="font-semibold"
                      tooltip={child.title}
                      isActive={pathname === child.url}
                      onClick={
                        isMobile ? () => setOpenMobile(false) : undefined
                      }
                    >
                      <Link
                        href={child.url}
                        className="flex items-center gap-2"
                      >
                        {child.icon && <child.icon />}
                        <span>{child.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </div>
        ) : (
          <SidebarMenu key={item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="font-semibold"
                asChild
                tooltip={item.title}
                isActive={pathname === item.url}
                onClick={isMobile ? () => setOpenMobile(false) : undefined}
              >
                <Link href={item.url} className="flex items-center gap-2">
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        );
      })}
    </SidebarGroup>
  );
}
