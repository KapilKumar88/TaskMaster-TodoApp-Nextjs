import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NavButton from './_ui/nav-button';

export default function DashboardTaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-slate-900 dark:text-white">Tasks</CardTitle>
        <NavButton />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
