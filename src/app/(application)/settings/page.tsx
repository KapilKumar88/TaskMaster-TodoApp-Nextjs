"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Check,
  Moon,
  Palette,
  Save,
  Sun,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUserSettingContext } from "@/contextApis/user-settings";
import GeneralSettingsForm from "@/components/settings/general-settings-form";

export default function SettingsPage() {
  const { theme, setTheme } = useUserSettingContext();
  const [glassEffect, setGlassEffect] = useState(50);
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
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
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
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                          Email Notifications
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>

                    <Separator className="bg-white/30" />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                          Push Notifications
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Receive notifications on your device
                        </p>
                      </div>
                      <Switch id="push-notifications" defaultChecked />
                    </div>

                    <Separator className="bg-white/30" />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                          Task Due Reminders
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Get reminded before tasks are due
                        </p>
                      </div>
                      <div className="flex items-center gap-2 sm:flex-row flex-col">
                        <Switch id="due-reminders" defaultChecked />
                        <Select defaultValue="1day">
                          <SelectTrigger className="w-full sm:w-[180px] border-white/30 bg-white/40">
                            <SelectValue placeholder="Select reminder time" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
                            <SelectItem value="1hour">1 hour before</SelectItem>
                            <SelectItem value="3hours">
                              3 hours before
                            </SelectItem>
                            <SelectItem value="1day">1 day before</SelectItem>
                            <SelectItem value="2days">2 days before</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator className="bg-white/30" />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                          Weekly Summary
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Receive a weekly summary of your tasks and progress
                        </p>
                      </div>
                      <Switch id="weekly-summary" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
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
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Theme
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        <div
                          className={`flex flex-col items-center gap-2 cursor-pointer p-3 rounded-lg ${
                            theme === "light"
                              ? "bg-white/50 ring-2 ring-indigo-500"
                              : "bg-white/20 hover:bg-white/30"
                          }`}
                          onClick={() => setTheme("light")}
                        >
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <Sun className="h-6 w-6 text-amber-500" />
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            Light
                          </span>
                          {theme === "light" && (
                            <Check className="h-4 w-4 text-indigo-500" />
                          )}
                        </div>

                        <div
                          className={`flex flex-col items-center gap-2 cursor-pointer p-3 rounded-lg ${
                            theme === "dark"
                              ? "bg-white/50 ring-2 ring-indigo-500"
                              : "bg-white/20 hover:bg-white/30"
                          }`}
                          onClick={() => setTheme("dark")}
                        >
                          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                            <Moon className="h-6 w-6 text-slate-200" />
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            Dark
                          </span>
                          {theme === "dark" && (
                            <Check className="h-4 w-4 text-indigo-500" />
                          )}
                        </div>

                        <div
                          className={`flex flex-col items-center gap-2 cursor-pointer p-3 rounded-lg ${
                            theme === "system"
                              ? "bg-white/50 ring-2 ring-indigo-500"
                              : "bg-white/20 hover:bg-white/30"
                          }`}
                          onClick={() => setTheme("system")}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-white to-slate-800 rounded-full flex items-center justify-center">
                            <Palette className="h-6 w-6 text-indigo-500" />
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            System
                          </span>
                          {theme === "system" && (
                            <Check className="h-4 w-4 text-indigo-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-white/30" />

                    <div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Accent Color
                      </h3>
                      <div className="grid grid-cols-5 gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 ring-2 ring-white cursor-pointer"></div>
                        <div className="w-8 h-8 rounded-full bg-teal-500 ring-2 ring-white/0 cursor-pointer"></div>
                        <div className="w-8 h-8 rounded-full bg-violet-500 ring-2 ring-white/0 cursor-pointer"></div>
                        <div className="w-8 h-8 rounded-full bg-amber-500 ring-2 ring-white/0 cursor-pointer"></div>
                        <div className="w-8 h-8 rounded-full bg-rose-500 ring-2 ring-white/0 cursor-pointer"></div>
                      </div>
                    </div>

                    <Separator className="bg-white/30" />

                    <div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Glass Effect Intensity
                      </h3>
                      <Slider
                        defaultValue={[50]}
                        max={100}
                        step={10}
                        className="w-full"
                        onValueChange={(values) => setGlassEffect(values[0])}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-slate-700 dark:text-slate-300">
                          Subtle
                        </span>
                        <span className="text-xs text-slate-700 dark:text-slate-300">
                          Strong
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
                        Current glass effect: {glassEffect}%
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="mt-0">
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
                    <div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Email Address
                      </h3>
                      <div className="flex gap-2 flex-col sm:flex-row">
                        <Input
                          value="john@example.com"
                          className="bg-white/40 border-white/30 text-slate-900 dark:text-white flex-1"
                        />
                        <Button
                          variant="outline"
                          className="border-white/30 bg-white/40"
                        >
                          Change
                        </Button>
                      </div>
                    </div>

                    <Separator className="bg-white/30" />

                    <div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Password
                      </h3>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            type="password"
                            placeholder="Current password"
                            className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Input
                            type="password"
                            placeholder="New password"
                            className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
                          />
                        </div>
                        <div className="flex gap-2 flex-col sm:flex-row">
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                            className="bg-white/40 border-white/30 text-slate-900 dark:text-white flex-1"
                          />
                          <Button
                            variant="outline"
                            className="border-white/30 bg-white/40"
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-white/30" />

                    <div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Data Export
                      </h3>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                        Download a copy of all your data
                      </p>
                      <Button
                        variant="outline"
                        className="border-white/30 bg-white/40"
                      >
                        Export Data
                      </Button>
                    </div>

                    <Separator className="bg-white/30" />

                    <div>
                      <h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                        Danger Zone
                      </h3>
                      <Alert
                        variant="destructive"
                        className="bg-red-100/50 border-red-300 text-red-800"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDescription>
                      </Alert>
                      <Button variant="destructive" className="mt-4">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                    We'd love to hear your thoughts on how we can improve.
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
