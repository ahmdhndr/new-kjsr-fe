"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Option = Record<string, string>;

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  valueKey?: string;
  labelKey?: string;
}

export function MultipleSelect({
  options,
  value,
  onChange,
  placeholder = "Select categories...",
  valueKey = "id",
  labelKey = "name",
}: MultiSelectProps) {
  const selected = options.filter((o) => value.includes(o[valueKey]));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selected.length > 0
            ? selected.map((c) => c.name).join(", ")
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>Category not found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const isSelected = value.includes(opt[valueKey]);
                return (
                  <CommandItem
                    key={String(opt[valueKey])}
                    value={opt[labelKey]}
                    onSelect={() => {
                      if (isSelected) {
                        onChange(value.filter((val) => val !== opt[valueKey]));
                      } else {
                        onChange([...value, opt[valueKey]]);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {opt[labelKey]}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
