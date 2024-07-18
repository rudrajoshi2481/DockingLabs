"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";

export function BranchSelectroComboBox() {
  const selectedBranch = CurrentlySelectedRepositoryState(
    (state: any) => state.selectedBranch
  );

  const repoBranchList = CurrentlySelectedRepositoryState(
    (state: any) => state.repoBranchList
  );

  const updateSelectedBranch = CurrentlySelectedRepositoryState(
    (state: any) => state.updateSelectedBranch
  );
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedBranch);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between"
        >
          {value
            ? repoBranchList.find((framework: any) => framework.name === value)
                ?.name
            : "Select Branch"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No Branch.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {repoBranchList?.map((framework: any) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(
                      currentValue === value ? currentValue : currentValue
                    );
                    updateSelectedBranch(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4  ",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <p className="truncate ...">
                  {framework.name}
                  </p>
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
