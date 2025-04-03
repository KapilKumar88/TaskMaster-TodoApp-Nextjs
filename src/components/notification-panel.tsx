'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bell, Check, Clock, User, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'task' | 'reminder' | 'system' | 'mention';
}

interface NotificationPanelProps {
  onClose: () => void;
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Task Due Soon',
      message: 'Complete project proposal is due in 2 hours',
      time: '2 hours ago',
      read: false,
      type: 'task',
    },
    {
      id: '2',
      title: 'Team Mention',
      message: "John mentioned you in a comment on 'Schedule team meeting'",
      time: 'Yesterday',
      read: false,
      type: 'mention',
    },
    {
      id: '3',
      title: 'Task Completed',
      message: 'Gym workout was completed by you',
      time: '3 days ago',
      read: true,
      type: 'task',
    },
  ]);

  const panelRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close the panel
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'task':
        return <Check className="h-4 w-4 text-indigo-500" />;
      case 'reminder':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'mention':
        return <User className="h-4 w-4 text-teal-500" />;
      default:
        return <Bell className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <Card
      className="absolute right-0 top-full mt-2 w-80 max-h-[400px] overflow-auto border border-white/30 bg-white/90 backdrop-blur-xl shadow-lg z-50"
      ref={panelRef}
    >
      <div className="flex items-center justify-between p-3 border-b border-white/30">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-indigo-500" />
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-800">
            Notifications
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs text-slate-700"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-slate-700"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>

      <div className="py-1">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-slate-700">
            No notifications to show
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border-b border-white/20 hover:bg-white/50 ${notification.read ? 'opacity-70' : 'bg-indigo-50/50'}`}
            >
              <div className="flex gap-3">
                <div className="mt-0.5">
                  {getIconForType(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {notification.title}
                    </p>
                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2 border-t border-white/30 text-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-indigo-600 hover:text-indigo-700 w-full"
        >
          View all notifications
        </Button>
      </div>
    </Card>
  );
}
