import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

function Input({
  className,
  type,
  startContent,
  endContent,
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      {startContent && (
        <span className="text-secondary-foreground absolute top-1/2 left-3 flex -translate-y-1/2 items-center">
          {startContent}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-secondary-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          startContent && "pl-9",
          endContent && "pr-9",
          className
        )}
        {...props}
      />
      {endContent && (
        <span className="text-secondary-foreground absolute top-1/2 right-3 flex -translate-y-1/2 items-center">
          {endContent}
        </span>
      )}
    </div>
  );
}

export { Input };
