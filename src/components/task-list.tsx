"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Star } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Priority = "low" | "medium" | "high"
type Category = "work" | "personal" | "study" | "health"
type Status = "active" | "completed" | "overdue"

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: Priority
  category: Category
  dueDate: string
  status: Status
  starred: boolean
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the quarterly project proposal for the marketing team",
    completed: false,
    priority: "high",
    category: "work",
    dueDate: "2025-03-15",
    status: "active",
    starred: true,
  },
  {
    id: "2",
    title: "Schedule team meeting",
    description: "Set up a meeting with the development team to discuss new features",
    completed: true,
    priority: "medium",
    category: "work",
    dueDate: "2025-03-12",
    status: "completed",
    starred: false,
  },
  {
    id: "3",
    title: "Gym workout",
    description: "Complete 30 minutes of cardio and strength training",
    completed: false,
    priority: "low",
    category: "health",
    dueDate: "2025-03-13",
    status: "active",
    starred: false,
  },
  {
    id: "4",
    title: "Read book chapter",
    description: "Read chapter 5 of 'Atomic Habits'",
    completed: false,
    priority: "medium",
    category: "personal",
    dueDate: "2025-03-14",
    status: "overdue",
    starred: false,
  },
  {
    id: "5",
    title: "Prepare for exam",
    description: "Review study materials for upcoming certification exam",
    completed: false,
    priority: "high",
    category: "study",
    dueDate: "2025-03-20",
    status: "active",
    starred: true,
  },
]

interface TaskListProps {
  filter?: "all" | "today" | "upcoming" | "completed"
}

export function TaskList({ filter = "all" }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              status: !task.completed ? "completed" : "active",
            }
          : task,
      ),
    )
  }

  const toggleStarred = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, starred: !task.starred } : task)))
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500/80 hover:bg-red-500"
      case "medium":
        return "bg-amber-500/80 hover:bg-amber-500"
      case "low":
        return "bg-emerald-500/80 hover:bg-emerald-500"
    }
  }

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case "work":
        return "bg-indigo-500/80 hover:bg-indigo-500"
      case "personal":
        return "bg-violet-500/80 hover:bg-violet-500"
      case "study":
        return "bg-blue-500/80 hover:bg-blue-500"
      case "health":
        return "bg-teal-500/80 hover:bg-teal-500"
    }
  }

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "active":
        return "bg-blue-500/80 hover:bg-blue-500"
      case "completed":
        return "bg-emerald-500/80 hover:bg-emerald-500"
      case "overdue":
        return "bg-red-500/80 hover:bg-red-500"
    }
  }

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const taskDate = new Date(task.dueDate)
    taskDate.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    switch (filter) {
      case "today":
        return taskDate.getTime() === today.getTime()
      case "upcoming":
        return taskDate > today && taskDate <= nextWeek
      case "completed":
        return task.completed
      default:
        return true
    }
  })

  return (
    <div className="space-y-3">
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-700 dark:text-slate-300">No tasks found</p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start justify-between rounded-lg border border-white/30 bg-white/40 p-4 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1 border-slate-400 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-medium ${task.completed ? "text-slate-500 line-through" : "text-slate-900 dark:text-white"}`}
                  >
                    {task.title}
                  </p>
                  {task.starred && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                </div>
                {task.description && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 line-clamp-2">{task.description}</p>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={`text-xs text-white ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                  <Badge variant="outline" className={`text-xs text-white ${getCategoryColor(task.category)}`}>
                    {task.category}
                  </Badge>
                  <Badge variant="outline" className={`text-xs text-white ${getStatusColor(task.status)}`}>
                    {task.status}
                  </Badge>
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-700 dark:text-slate-300 hover:text-amber-500"
                onClick={() => toggleStarred(task.id)}
              >
                <Star className={`h-4 w-4 ${task.starred ? "fill-amber-400 text-amber-400" : ""}`} />
                <span className="sr-only">Star task</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white/90 backdrop-blur-xl border-white/30">
                  <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                  <DropdownMenuItem>Set Priority</DropdownMenuItem>
                  <DropdownMenuItem>Change Category</DropdownMenuItem>
                  <DropdownMenuItem>Change Due Date</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Delete Task</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

