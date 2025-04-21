'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function DatePicker({
  date,
  setDate,
  errorMsg,
  disablePortal,
}: Readonly<{
  date?: Date;
  setDate: (date?: Date) => void;
  errorMsg?: string;
  disablePortal?: boolean;
}>) {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <>
      <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
        <PopoverTrigger asChild>
          <Button
            id="due-date"
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal border-white/30 bg-white/40',
              !date && 'text-muted-foreground',
            )}
            onClick={() => {
              setOpenDatePicker(true);
            }}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-4 bg-white/90 backdrop-blur-xl border-white/30"
          disablePortal={disablePortal}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(payload) => {
              setDate(payload);
              setOpenDatePicker(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </>
  );
}
