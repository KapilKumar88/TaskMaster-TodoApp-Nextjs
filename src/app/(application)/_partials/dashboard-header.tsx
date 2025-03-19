"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Menu, Plus, Search } from "lucide-react"
import { NotificationPanel } from "@/components/notification-panel"

interface DashboardHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function DashboardHeader({ sidebarOpen, setSidebarOpen }: DashboardHeaderProps) {
  const [notificationOpen, setNotificationOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/30 bg-white/30 backdrop-blur-xl px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-slate-900 dark:text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <h1 className="text-xl font-semibold text-slate-900 dark:text-white md:text-2xl">Dashboard</h1>

      <div className="relative ml-auto flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-64 rounded-full bg-white/40 pl-8 text-slate-900 dark:text-white border-white/30 focus-visible:ring-indigo-500"
          />
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="relative border-white/30 bg-white/40 text-slate-900 dark:text-white hover:bg-white/50 hover:text-slate-900 dark:hover:text-white"
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>

          {notificationOpen && <NotificationPanel onClose={() => setNotificationOpen(false)} />}
        </div>

        <Button className="hidden bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white sm:flex">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
    </header>
  )
}

