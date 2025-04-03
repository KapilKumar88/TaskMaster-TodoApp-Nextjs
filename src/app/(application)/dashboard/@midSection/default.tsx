import { auth } from '@/auth';
import MidSection from '@/components/dashboard/mid-section';

export default async function DashboardMidSectionDefaultPage() {
  const userSession = await auth();
  return <MidSection userSession={userSession!} />;
}
