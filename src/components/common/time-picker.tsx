'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TimePickerProps {
  value?: string;
  onChange: (time: string | undefined) => void;
  className?: string;
}

export function TimePicker({
  value,
  onChange,
  className,
}: Readonly<TimePickerProps>) {
  const [hours, setHours] = useState<string>('12');
  const [minutes, setMinutes] = useState<string>('00');
  const [period, setPeriod] = useState<'AM' | 'PM'>('PM');
  const [open, setOpen] = useState(false);

  // Parse the time value when it changes
  useEffect(() => {
    if (value) {
      const match = value.match(/(\d+):(\d+)\s*(AM|PM)/);
      if (match) {
        setHours(match[1]);
        setMinutes(match[2]);
        setPeriod(match[3] as 'AM' | 'PM');
      }
    }
  }, [value]);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val) {
      const num = Number.parseInt(val, 10);
      if (num > 12) val = '12';
      if (num < 1) val = '1';
    }
    setHours(val);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val) {
      const num = Number.parseInt(val, 10);
      if (num > 59) val = '59';
    }
    setMinutes(val.padStart(2, '0'));
  };

  const handlePeriodToggle = () => {
    setPeriod(period === 'AM' ? 'PM' : 'AM');
  };

  const handleApply = () => {
    if (hours && minutes) {
      const formattedHours = hours.padStart(2, '0');
      const formattedMinutes = minutes.padStart(2, '0');
      onChange(`${formattedHours}:${formattedMinutes} ${period}`);
      setOpen(false);
    }
  };

  const handleClear = () => {
    onChange(undefined);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal border-white/30 bg-white/40',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value ?? <span>Set time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 bg-white/90 backdrop-blur-xl border-white/30">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="grid gap-1">
              <Label htmlFor="hours" className="text-xs text-center">
                Hours
              </Label>
              <Input
                id="hours"
                className="w-16 h-10 text-center bg-white/40 border-white/30"
                value={hours}
                onChange={handleHoursChange}
                maxLength={2}
              />
            </div>
            <div className="text-2xl font-semibold text-slate-700 mt-6">:</div>
            <div className="grid gap-1">
              <Label htmlFor="minutes" className="text-xs text-center">
                Minutes
              </Label>
              <Input
                id="minutes"
                className="w-16 h-10 text-center bg-white/40 border-white/30"
                value={minutes}
                onChange={handleMinutesChange}
                maxLength={2}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="period" className="text-xs text-center">
                AM/PM
              </Label>
              <Button
                id="period"
                variant="outline"
                className="w-16 h-10 bg-white/40 border-white/30"
                onClick={handlePeriodToggle}
              >
                {period}
              </Button>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="border-white/30 bg-white/40"
            >
              Clear
            </Button>
            <Button
              size="sm"
              onClick={handleApply}
              className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
