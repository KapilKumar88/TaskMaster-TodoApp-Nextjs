import { auth } from '@/auth';
import TopSection from '@/components/dashboard/top-section';
import MidSection from '@/components/dashboard/mid-section';
import Unauthorized from '@/components/common/unauthorized';

export default async function DashboardLayout({
  children,
  task,
}: Readonly<{
  children: React.ReactNode;
  task: React.ReactNode;
}>) {
  const userSession = await auth();
  if (userSession === null) {
    return <Unauthorized />;
  }

  return (
    <main className="p-6">
      <TopSection userSession={userSession} />
      <MidSection userSession={userSession} />

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-7">
        {children}
        {task}
      </div>
    </main>
  );
}
