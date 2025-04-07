'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavButton() {
  const pathname = usePathname();
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={'/dashboard'}
          className={clsx('rounded-lg px-3 py-1 text-sm font-medium', {
            'bg-indigo-500 text-white': pathname === '/dashboard',
          })}
        >
          Important
        </Link>
        <Link
          href={'/dashboard/overdue'}
          className={clsx('rounded-lg px-3 py-1 text-sm font-medium', {
            'bg-indigo-500 text-white': pathname === '/dashboard/overdue',
          })}
        >
          Overdue
        </Link>
        <Link
          href={'/dashboard/active'}
          className={clsx('rounded-lg px-3 py-1 text-sm font-medium', {
            'bg-indigo-500 text-white': pathname === '/dashboard/active',
          })}
        >
          Active
        </Link>
        <Link
          href={'/dashboard/completed'}
          className={clsx('rounded-lg px-3 py-1 text-sm font-medium', {
            'bg-indigo-500 text-white': pathname === '/dashboard/completed',
          })}
        >
          Completed
        </Link>
      </div>
    </div>
  );
}
