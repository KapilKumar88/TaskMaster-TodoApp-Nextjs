'use client';

// import { useRef } from 'react';
import { Check } from 'lucide-react';
import { capitalizeFirstLetters, cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({
  value,
  onChange,
  className,
}: Readonly<ColorPickerProps>) {
  // const colorPickerRef = useRef(null);

  const colors = [
    { name: 'slate', value: '#64748b' },
    { name: 'gray', value: '#6b7280' },
    { name: 'zinc', value: '#71717a' },
    { name: 'red', value: '#ef4444' },
    { name: 'orange', value: '#f97316' },
    { name: 'amber', value: '#f59e0b' },
    { name: 'yellow', value: '#eab308' },
    { name: 'lime', value: '#84cc16' },
    { name: 'green', value: '#22c55e' },
    { name: 'emerald', value: '#10b981' },
    { name: 'teal', value: '#14b8a6' },
    { name: 'cyan', value: '#06b6d4' },
    { name: 'sky', value: '#0ea5e9' },
    { name: 'blue', value: '#3b82f6' },
    { name: 'indigo', value: '#6366f1' },
    { name: 'violet', value: '#8b5cf6' },
    { name: 'purple', value: '#a855f7' },
    { name: 'fuchsia', value: '#d946ef' },
    { name: 'pink', value: '#ec4899' },
    { name: 'rose', value: '#f43f5e' },
  ];

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {colors.map((color) => (
        <button
          key={color.name}
          type="button"
          className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center transition-all',
            value === color.value
              ? 'ring-2 ring-offset-2 ring-white/50'
              : 'hover:scale-110',
          )}
          style={{ backgroundColor: color.value }}
          onClick={() => onChange(color.value)}
          title={capitalizeFirstLetters(color.name)}
        >
          {value === color.value && <Check className="h-3 w-3 text-white" />}
        </button>
      ))}
      {/* <Button
        variant="ghost"
        size="icon"
        type="button"
        className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
        onClick={() => {
          colorPickerRef?.current.click();
        }}
        title="Color Picker">
        <PinIcon className="h-4 w-4" />
        <input
          ref={colorPickerRef}
          type="color"
          name="colorPicker"
          id="colorPicker"
          style={{
            visibility: 'hidden',
          }}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </Button> */}
    </div>
  );
}
