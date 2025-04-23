export const DEFAULT_CATEGORIES = [
  {
    name: 'personal',
    color: '#6366f1', // bg-indigo-500/80
    hoverColor: 'rgb(99, 102, 241)', // bg-indigo-500
  },
  {
    name: 'work',
    color: '#8b5cf6', // bg-violet-500/80
    hoverColor: 'rgb(139, 92, 246)', // bg-violet-500
  },
  {
    name: 'hobbies',
    color: '#3b82f6', // bg-blue-500/80
    hoverColor: 'rgb(59, 130, 246)', // bg-blue-500
  },
  {
    name: 'health',
    color: '#14b8a6', // bg-teal-500/80
    hoverColor: 'rgb(20, 184, 166)', // bg-teal-500
  },
];

export const DIFFERENT_COLOR_CODES = [
  '#dc262680',
  '#f9731699',
  '#f59e0b99',
  '#fef08a80',
  '#d9f99d80',
  '#4ade8080',
  '#34d39999',
  '#5eead4b3',
  '#22d3ee99',
  '#7dd3f0b3',
  '#93c5fdb3',
  '#6366f199',
  '#8b5cf699',
  '#c084fc80',
  '#e879f980',
  '#be185d99',
  '#be123c99',
  '#37415199',
  '#11182766',
  '#3f3f4680',
  '#40404080',
  '#44403c80',
];

export const API_ENDPOINTS = {
  TASK: {
    STATS_BY_CATEGORY: 'api/v1/task/stats-by-category',
    LIST: 'api/v1/task',
  },
};

export const ACCENT_COLORS = [
  { name: 'indigo', class: 'bg-indigo-500' },
  { name: 'teal', class: 'bg-teal-500' },
  { name: 'violet', class: 'bg-violet-500' },
  { name: 'amber', class: 'bg-amber-500' },
  { name: 'rose', class: 'bg-rose-500' },
];

export const CUSTOM_ERROR_CODES = {
  TASK_001: {
    message: 'Invalid Link',
    code: 'TASK_001',
  },
  TASK_002: {
    message: 'Email already verified',
    code: 'TASK_002',
  },
  TASK_003: {
    message: 'Token Expired',
    code: 'TASK_003',
  },
};

export const WORKER_QUEUE = {
  QUEUE_NAMES: {
    TASK_NOTIFICATION: 'task-notification',
  },
  TASK_NAME: {
    NOTIFY_ABOUT_TASK_EXPIRED: 'notify-about-task-expired',
    NOTIFY_ABOUT_TASK_DUE: 'notify-about-task-due',
    NOTIFY_ABOUT_TASK_COMPLETED: 'notify-about-task-completed',
    NOTIFY_ABOUT_TASK_CREATED: 'notify-about-task-created',
    NOTIFY_ABOUT_TASK_UPDATED: 'notify-about-task-updated',
  },
};
