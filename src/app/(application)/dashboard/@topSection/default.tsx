import { auth } from '@/auth';
import TopSection from '@/components/dashboard/top-section';

export default async function DashboardTopSectionDefaultPage() {
  const userSession = await auth();
  return <TopSection userSession={userSession!} />;
}
