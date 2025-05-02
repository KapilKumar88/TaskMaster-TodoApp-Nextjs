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
import { useUserSettingContext } from '@/contextApis/user-settings';
import { WeekStartDay } from '@prisma/client';
import { DayPickerDefaultProps } from 'react-day-picker';

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
  const { userSettings } = useUserSettingContext();
  let weekStartDay: DayPickerDefaultProps['weekStartsOn'] = 0; // 0 is for sunday

  if (userSettings?.weekStartDay === WeekStartDay.monday) {
    weekStartDay = 1;
  } else if (userSettings?.weekStartDay === WeekStartDay.saturday) {
    weekStartDay = 6;
  }

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
            weekStartsOn={weekStartDay}
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
