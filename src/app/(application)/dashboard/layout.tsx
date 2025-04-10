import { auth } from '@/auth';
import Unauthorized from '@/components/common/unauthorized';

export default async function DashboardLayout({
  children,
  task,
  topSection,
  midSection,
}: Readonly<{
  children: React.ReactNode;
  task: React.ReactNode;
  topSection: React.ReactNode;
  midSection: React.ReactNode;
}>) {
  const userSession = await auth();
  if (userSession === null) {
    return <Unauthorized />;
  }

  return (
    <main className="p-6">
      {topSection}
      {midSection}

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-7">
        {children}
        {task}
      </div>
    </main>
  );
}
