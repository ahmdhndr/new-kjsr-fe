import React from "react";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const SidebarInsetComponent = ({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) => {
  return (
    <SidebarInset className="flex min-h-screen">
      <header className="flex h-16 w-full shrink-0 items-center gap-2 shadow-2xs transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {header}
        </div>
      </header>
      {/* CONTENT */}
      <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
    </SidebarInset>
  );
};

export default SidebarInsetComponent;
