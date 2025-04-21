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
  time?: string;
  setTime: (time: string) => void;
  errorMsg?: string;
  disablePortal?: boolean;
}

export function TimePicker({
  time,
  setTime,
  errorMsg,
  disablePortal,
}: Readonly<TimePickerProps>) {
  const [hours, setHours] = useState<string>('12');
  const [minutes, setMinutes] = useState<string>('00');
  const [seconds, setSeconds] = useState<string>('00');
  const [open, setOpen] = useState(false);

  // Parse the time value when it changes
  useEffect(() => {
    if (time) {
      const match = time.match(/(\d+):(\d+):(\d+)/);
      if (match) {
        setHours(match[1]);
        setMinutes(match[2]);
        setSeconds(match[2]);
      }
    }
  }, [time]);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val) {
      const num = Number.parseInt(val, 10);
      if (num > 24) val = '24';
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
    setMinutes(val);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val) {
      const num = Number.parseInt(val, 10);
      if (num > 59) val = '59';
    }
    setSeconds(val);
  };

  const handleApply = () => {
    if (hours && minutes) {
      const formattedHours = hours.padStart(2, '0');
      const formattedMinutes = minutes.padStart(2, '0');
      const formattedSeconds = seconds.padStart(2, '0');
      setTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
      setOpen(false);
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal border-white/30 bg-white/40',
              !time && 'text-muted-foreground',
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {time ?? <span>Set time</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-4 bg-white/90 backdrop-blur-xl border-white/30"
          disablePortal={disablePortal}
        >
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
              <div className="text-2xl font-semibold text-slate-700 mt-6">
                :
              </div>
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
              <div className="text-2xl font-semibold text-slate-700 mt-6">
                :
              </div>
              <div className="grid gap-1">
                <Label htmlFor="minutes" className="text-xs text-center">
                  Seconds
                </Label>
                <Input
                  id="seconds"
                  className="w-16 h-10 text-center bg-white/40 border-white/30"
                  value={seconds}
                  onChange={handleSecondsChange}
                  maxLength={2}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
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
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </>
  );
}
