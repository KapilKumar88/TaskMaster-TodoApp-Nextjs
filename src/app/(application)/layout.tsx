import { auth } from '@/auth';
import { DashboardHeader } from './_partials/dashboard-header';
import { DashboardSidebar } from './_partials/dashboard-sidebar';
import { SidebarContextProvider } from '@/contextApis/side-bar';
import { UserSettingProvider } from '@/contextApis/user-settings';
import { getUserSettings } from '@/services/settings.service';
import { Toaster } from '@/components/common/sonner';
import Unauthorized from '@/components/common/unauthorized';
import { getUserCategories } from '@/services/category.service';
import { CategoryContextProvider } from '@/contextApis/categories';

export default async function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSession = await auth();
  if (userSession === null) {
    return <Unauthorized />;
  }
  const userSettings = await getUserSettings(userSession?.user.id);
  const userCategories = await getUserCategories(userSession?.user.id);

  return (
    <UserSettingProvider settings={userSettings}>
      <CategoryContextProvider categoriesList={userCategories}>
        <SidebarContextProvider>
          <div className="min-h-screen bg-gradient-to-br from-teal-500/20 to-indigo-600/20">
            {/* Background shapes */}
            <div className="fixed inset-0 overflow-hidden -z-10">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-400/30 rounded-full blur-3xl" />
            </div>
            <div className="flex h-screen overflow-hidden">
              <DashboardSidebar userSession={userSession} />
              <div className="flex-1 overflow-auto">
                <DashboardHeader />
                <main className="p-6">{children}</main>
              </div>
            </div>
          </div>
          <Toaster position="top-right" theme={userSettings?.appTheme} />
        </SidebarContextProvider>
      </CategoryContextProvider>
    </UserSettingProvider>
  );
}
