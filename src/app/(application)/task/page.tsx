import { auth } from '@/auth';
import Task from '@/components/task';
import { getUserCategories } from '@/services/category.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Task`,
};

export default async function TaskPage() {
  const userSession = await auth();
  const categoryList = userSession?.user?.id
    ? await getUserCategories(userSession?.user?.id)
    : [];
  return (
    <main className="p-4 md:p-6">
      <Task categories={categoryList} />
    </main>
  );
}
