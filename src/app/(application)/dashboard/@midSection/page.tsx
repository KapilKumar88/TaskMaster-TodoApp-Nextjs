import { auth } from '@/auth';
import MidSection from '@/components/dashboard/mid-section';

export default async function DashboardMidSection() {
  const userSession = await auth();
  return <MidSection userSession={userSession!} />;
}
