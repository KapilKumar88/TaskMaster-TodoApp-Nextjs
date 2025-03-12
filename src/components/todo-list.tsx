"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"

type Priority = "low" | "medium" | "high"
type Category = "work" | "personal" | "study" | "health"

interface Todo {
  id: string
  title: string
  completed: boolean
  priority: Priority
  category: Category
  dueDate: string
}

const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Complete project proposal",
    completed: false,
    priority: "high",
    category: "work",
    dueDate: "2025-03-15",
  },
  {
    id: "2",
    title: "Schedule team meeting",
    completed: true,
    priority: "medium",
    category: "work",
    dueDate: "2025-03-12",
  },
  {
    id: "3",
    title: "Gym workout",
    completed: false,
    priority: "low",
    category: "health",
    dueDate: "2025-03-13",
  },
  {
    id: "4",
    title: "Read book chapter",
    completed: false,
    priority: "medium",
    category: "personal",
    dueDate: "2025-03-14",
  },
  {
    id: "5",
    title: "Prepare for exam",
    completed: false,
    priority: "high",
    category: "study",
    dueDate: "2025-03-20",
  },
]

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
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

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between rounded-lg border border-white/30 bg-white/40 p-3 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
              className="border-slate-400 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
            />
            <div>
              <p
                className={`text-sm font-medium ${todo.completed ? "text-slate-500 line-through" : "text-slate-900 dark:text-white"}`}
              >
                {todo.title}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className={`text-xs text-white ${getPriorityColor(todo.priority)}`}>
                  {todo.priority}
                </Badge>
                <Badge variant="outline" className={`text-xs text-white ${getCategoryColor(todo.category)}`}>
                  {todo.category}
                </Badge>
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      ))}
    </div>
  )
}

