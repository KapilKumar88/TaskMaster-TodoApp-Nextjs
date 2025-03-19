"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BarChart3, CheckSquare, LayoutDashboard, LogOut, Settings, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function DashboardSidebar({ open, setOpen }: DashboardSidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Tasks",
      icon: CheckSquare,
      href: "/task",
      active: pathname === "/task",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col border-r border-white/30 bg-white/30 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-2 border-b border-white/30 px-6">
          <div className="relative h-8 w-8 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">T</span>
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">TodoApp</span>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant="ghost"
                asChild
                className={cn(
                  "justify-start gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-white/40 dark:hover:text-white",
                  route.active && "bg-white/40 text-slate-900 dark:text-white font-medium",
                )}
              >
                <Link href={route.href}>
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/30 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/40 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20">
              <User className="h-5 w-5 text-indigo-700 dark:text-indigo-300" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-slate-900 dark:text-white">John Doe</p>
              <p className="truncate text-xs text-slate-700 dark:text-slate-300">john@example.com</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

