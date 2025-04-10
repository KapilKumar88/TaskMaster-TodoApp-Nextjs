import Task from '@/components/task';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Task`,
};

export default async function TaskPage() {
  return (
    <main className="p-4 md:p-6">
      <Task />
    </main>
  );
}
