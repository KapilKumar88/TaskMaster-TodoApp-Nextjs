import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import GeneralSettingsForm from '@/components/settings/general-settings-form';
import NotificationSettingsForm from '@/components/settings/notification-settings-form';
import AppearanceSettingsForm from '@/components/settings/appearance-settings-form';
import EmailAddress from '@/components/settings/account-settings/email-address';
import PasswordChange from '@/components/settings/account-settings/password-change';
import ExportData from '@/components/settings/account-settings/data-export';
import DeleteAccount from '@/components/settings/account-settings/delete-account';
import CustomErrorBoundary from '@/components/common/ErrorBoundary';

export default function SettingsPage() {
  return (
    <main className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0">
          Settings
        </h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-white/40 border border-white/30 mb-6 w-full overflow-x-auto flex-nowrap md:w-auto">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
          >
            Appearance
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
          >
            Account
          </TabsTrigger>
        </TabsList>

        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-5">
            <TabsContent value="general" className="mt-0">
              <CustomErrorBoundary>
                <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-slate-900 dark:text-white">
                      General Settings
                    </CardTitle>
                    <CardDescription className="text-slate-700 dark:text-slate-300">
                      Manage your general application preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <GeneralSettingsForm />
                  </CardContent>
                </Card>
              </CustomErrorBoundary>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <CustomErrorBoundary>
                <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-slate-900 dark:text-white">
                      Notification Settings
                    </CardTitle>
                    <CardDescription className="text-slate-700 dark:text-slate-300">
                      Manage how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <NotificationSettingsForm />
                  </CardContent>
                </Card>
              </CustomErrorBoundary>
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
              <CustomErrorBoundary>
                <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-slate-900 dark:text-white">
                      Appearance Settings
                    </CardTitle>
                    <CardDescription className="text-slate-700 dark:text-slate-300">
                      Customize how the application looks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <AppearanceSettingsForm />
                  </CardContent>
                </Card>
              </CustomErrorBoundary>
            </TabsContent>

            <TabsContent value="account" className="mt-0">
              <CustomErrorBoundary>
                <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-slate-900 dark:text-white">
                      Account Settings
                    </CardTitle>
                    <CardDescription className="text-slate-700 dark:text-slate-300">
                      Manage your account information and security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <EmailAddress />
                      <Separator className="bg-white/30" />
                      <PasswordChange />
                      <Separator className="bg-white/30" />
                      <ExportData />
                      <Separator className="bg-white/30" />
                      <DeleteAccount />
                    </div>
                  </CardContent>
                </Card>
              </CustomErrorBoundary>
            </TabsContent>
          </div>

          <div className="md:col-span-2">
            <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md sticky top-20">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">
                  Help & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-white/40 p-4">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                    Need help?
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                    Check our documentation or contact support for assistance.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-white/30 bg-white/40"
                  >
                    View Documentation
                  </Button>
                </div>

                <div className="rounded-lg bg-white/40 p-4">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                    Feedback
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                    We&apos;d love to hear your thoughts on how we can improve.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-white/30 bg-white/40"
                  >
                    Send Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </main>
  );
}
