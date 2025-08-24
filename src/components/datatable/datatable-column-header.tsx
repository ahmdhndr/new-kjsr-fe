import { Column } from "@tanstack/react-table";
import {
  HiMiniArrowSmallDown,
  HiMiniArrowSmallUp,
  HiMiniArrowsUpDown,
} from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  isHideable?: boolean;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-white-kjsr data-[state=open]:text-primary -ml-3 h-8 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <HiMiniArrowSmallDown />
            ) : column.getIsSorted() === "asc" ? (
              <HiMiniArrowSmallUp />
            ) : (
              <HiMiniArrowsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <HiMiniArrowSmallUp className="text-muted-foreground/70 h-3.5 w-3.5" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <HiMiniArrowSmallDown className="text-muted-foreground/70 h-3.5 w-3.5" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.clearSorting()}>
            <HiMiniArrowsUpDown className="text-muted-foreground/70 h-3.5 w-3.5" />
            Reset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
