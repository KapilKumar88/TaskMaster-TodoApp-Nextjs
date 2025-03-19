"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface TaskFormProps {
  onClose: () => void
}

export function TaskForm({ onClose }: TaskFormProps) {
  const [date, setDate] = useState<Date>()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="title" className="text-slate-900 dark:text-white">
          Task Title
        </Label>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <Input
        id="title"
        placeholder="Enter task title"
        className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
      />

      <div className="space-y-2">
        <Label htmlFor="description" className="text-slate-900 dark:text-white">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Enter task description"
          className="min-h-[80px] bg-white/40 border-white/30 text-slate-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-slate-900 dark:text-white">
            Category
          </Label>
          <Select>
            <SelectTrigger id="category" className="bg-white/40 border-white/30 text-slate-900 dark:text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="study">Study</SelectItem>
              <SelectItem value="health">Health</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority" className="text-slate-900 dark:text-white">
            Priority
          </Label>
          <Select>
            <SelectTrigger id="priority" className="bg-white/40 border-white/30 text-slate-900 dark:text-white">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="due-date" className="text-slate-900 dark:text-white">
          Due Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="due-date"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-white/30 bg-white/40",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white/90 backdrop-blur-xl border-white/30">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onClose} className="border-white/30 bg-white/40">
          Cancel
        </Button>
        <Button className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white">
          Create Task
        </Button>
      </div>
    </div>
  )
}

