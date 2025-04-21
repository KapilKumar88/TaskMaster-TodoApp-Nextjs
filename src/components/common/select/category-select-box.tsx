'use client';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCategoryContext } from '@/contextApis/categories';
import { capitalizeFirstLetters, cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function CategorySelectBox({
  selectedCategoryId,
  setSelectedCategoryId,
  errorMsg,
  disablePortal,
}: Readonly<{
  selectedCategoryId: number;
  setSelectedCategoryId: (id: number) => void;
  errorMsg?: string;
  disablePortal?: boolean;
}>) {
  const { categories } = useCategoryContext();
  const [openCategoryPopup, setOpenCategoryPopup] = useState(false);
  return (
    <>
      <Popover
        open={openCategoryPopup}
        onOpenChange={(eve) => {
          setOpenCategoryPopup(eve);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="bg-white/40 border-white/30 text-slate-900 dark:text-white w-full flex justify-between"
          >
            <span>
              {capitalizeFirstLetters(
                categories
                  .find((c) => c.id === selectedCategoryId)
                  ?.name?.trim() ?? 'Select Category',
              )}
            </span>
            <ChevronDown className="ml-7 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full sm:w-[245px] p-0 bg-white/90 backdrop-blur-xl border-white/30"
          disablePortal={disablePortal}
        >
          <Command>
            <CommandInput placeholder="Search categories..." className="h-9" />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              {/* Update the CommandItem to use the handler */}
              <CommandGroup className="max-h-[200px] overflow-auto">
                {categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.name}
                    onSelect={() => {
                      setSelectedCategoryId(category.id);
                      setOpenCategoryPopup(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedCategoryId === category.id
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="capitalize">
                        {capitalizeFirstLetters(category.name)}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </>
  );
}
