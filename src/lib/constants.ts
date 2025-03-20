export const DEFAULT_CATEGORIES = [
  {
    name: "personal",
    color: "bg-indigo-500/80 hover:bg-indigo-500",
  },
  {
    name: "work",
    color: "bg-violet-500/80 hover:bg-violet-500",
  },
  {
    name: "hobbies",
    color: "bg-blue-500/80 hover:bg-blue-500",
  },
  {
    name: "health",
    color: "bg-teal-500/80 hover:bg-teal-500",
  },
];

export const API_ENDPOINTS = {
  TASK: {
    STATS_BY_CATEGORY: "api/v1/task/stats-by-category",
    LIST: "api/v1/task",
  },
};
