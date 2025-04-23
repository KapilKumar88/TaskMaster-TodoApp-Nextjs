'use client';
import useFCM from '@/hooks/useFCM';

export default function NotificationPermission() {
  useFCM();
  return null;
}
