'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { DashboardHeader } from '@/components/dashboard-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Camera,
  Check,
  Edit,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Save,
  Twitter,
} from 'lucide-react';

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editing, setEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500/20 to-indigo-600/20">
      {/* Background shapes */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-400/30 rounded-full blur-3xl" />
      </div>

      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <div className="flex-1 overflow-auto">
          <DashboardHeader
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />

          <main className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0">
                Profile
              </h1>

              {!editing ? (
                <Button
                  variant="outline"
                  className="border-white/30 bg-white/40"
                  onClick={() => setEditing(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-white/30 bg-white/40"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
                    onClick={() => setEditing(false)}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
                  <CardHeader className="pb-2 text-center">
                    <div className="relative mx-auto mb-4">
                      <Avatar className="w-24 h-24 border-4 border-white">
                        <AvatarImage
                          src="/placeholder.svg?height=96&width=96"
                          alt="John Doe"
                        />
                        <AvatarFallback className="bg-indigo-500 text-white text-xl">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      {editing && (
                        <Button
                          size="icon"
                          className="absolute bottom-0 right-0 rounded-full bg-indigo-500 hover:bg-indigo-600"
                        >
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Change avatar</span>
                        </Button>
                      )}
                    </div>
                    <CardTitle className="text-xl text-slate-900 dark:text-white">
                      John Doe
                    </CardTitle>
                    <CardDescription className="text-slate-700 dark:text-slate-300">
                      Product Designer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center gap-2 mb-4">
                      <Badge
                        variant="outline"
                        className="bg-indigo-500/80 text-white border-0"
                      >
                        Pro User
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-emerald-500/80 text-white border-0"
                      >
                        Verified
                      </Badge>
                    </div>

                    <div className="space-y-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-slate-700 dark:text-slate-300">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">john@example.com</span>
                      </div>

                      <div className="flex justify-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full border-white/30 bg-white/40"
                        >
                          <Twitter className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                          <span className="sr-only">Twitter</span>
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full border-white/30 bg-white/40"
                        >
                          <Linkedin className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                          <span className="sr-only">LinkedIn</span>
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full border-white/30 bg-white/40"
                        >
                          <Github className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                          <span className="sr-only">GitHub</span>
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full border-white/30 bg-white/40"
                        >
                          <Instagram className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                          <span className="sr-only">Instagram</span>
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-4 bg-white/30" />

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-700 dark:text-slate-300">
                            Productivity Score
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            85%
                          </span>
                        </div>
                        <Progress
                          value={85}
                          className="h-2 bg-white/20"
                          // indicatorClassName="bg-indigo-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-700 dark:text-slate-300">
                            Task Completion
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            92%
                          </span>
                        </div>
                        <Progress
                          value={92}
                          className="h-2 bg-white/20"
                          // indicatorClassName="bg-emerald-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-700 dark:text-slate-300">
                            On-time Delivery
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            78%
                          </span>
                        </div>
                        <Progress
                          value={78}
                          className="h-2 bg-white/20"
                          // indicatorClassName="bg-amber-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md mt-6">
                  <CardHeader>
                    <CardTitle className="text-slate-900 dark:text-white">
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-1">
                          <Check className="h-6 w-6 text-indigo-600" />
                        </div>
                        <span className="text-xs text-center text-slate-700 dark:text-slate-300">
                          100 Tasks
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                          <Check className="h-6 w-6 text-emerald-600" />
                        </div>
                        <span className="text-xs text-center text-slate-700 dark:text-slate-300">
                          30 Day Streak
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                          <Check className="h-6 w-6 text-amber-600" />
                        </div>
                        <span className="text-xs text-center text-slate-700 dark:text-slate-300">
                          Early Bird
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="bg-white/40 border border-white/30 mb-6 w-full overflow-x-auto flex-nowrap md:w-auto">
                    <TabsTrigger
                      value="info"
                      className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                    >
                      Personal Info
                    </TabsTrigger>
                    <TabsTrigger
                      value="activity"
                      className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                    >
                      Activity
                    </TabsTrigger>
                    <TabsTrigger
                      value="preferences"
                      className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                    >
                      Preferences
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="mt-0">
                    <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
                      <CardHeader>
                        <CardTitle className="text-slate-900 dark:text-white">
                          Personal Information
                        </CardTitle>
                        <CardDescription className="text-slate-700 dark:text-slate-300">
                          Update your personal details
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="first-name"
                              className="text-slate-900 dark:text-white"
                            >
                              First Name
                            </Label>
                            <Input
                              id="first-name"
                              defaultValue="John"
                              disabled={!editing}
                              className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="last-name"
                              className="text-slate-900 dark:text-white"
                            >
                              Last Name
                            </Label>
                            <Input
                              id="last-name"
                              defaultValue="Doe"
                              disabled={!editing}
                              className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-slate-900 dark:text-white"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue="john@example.com"
                            disabled={!editing}
                            className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="job-title"
                            className="text-slate-900 dark:text-white"
                          >
                            Job Title
                          </Label>
                          <Input
                            id="job-title"
                            defaultValue="Product Designer"
                            disabled={!editing}
                            className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="bio"
                            className="text-slate-900 dark:text-white"
                          >
                            Bio
                          </Label>
                          <Textarea
                            id="bio"
                            placeholder="Tell us about yourself"
                            defaultValue="I'm a product designer with 5+ years of experience in creating user-centered digital products. I specialize in UI/UX design, prototyping, and design systems."
                            disabled={!editing}
                            className="min-h-[100px] bg-white/40 border-white/30 text-slate-900 dark:text-white"
                          />
                        </div>
                      </CardContent>
                      {editing && (
                        <CardFooter>
                          <Button
                            className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
                            onClick={() => setEditing(false)}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  </TabsContent>

                  <TabsContent value="activity" className="mt-0">
                    <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
                      <CardHeader>
                        <CardTitle className="text-slate-900 dark:text-white">
                          Recent Activity
                        </CardTitle>
                        <CardDescription className="text-slate-700 dark:text-slate-300">
                          Your recent actions and task history
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="relative pl-6 border-l-2 border-indigo-500 pb-6">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-slate-900 dark:text-white">
                                Completed task &quot;Complete project
                                proposal&quot;
                              </p>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                Today at 10:30 AM
                              </p>
                            </div>
                          </div>

                          <div className="relative pl-6 border-l-2 border-emerald-500 pb-6">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-slate-900 dark:text-white">
                                Created new task &quot;Schedule team
                                meeting&quot;
                              </p>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                Yesterday at 2:15 PM
                              </p>
                            </div>
                          </div>

                          <div className="relative pl-6 border-l-2 border-amber-500 pb-6">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500"></div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-slate-900 dark:text-white">
                                Updated task priority for &quot;Prepare for
                                exam&quot;
                              </p>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                Yesterday at 11:45 AM
                              </p>
                            </div>
                          </div>

                          <div className="relative pl-6 border-l-2 border-indigo-500 pb-6">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-slate-900 dark:text-white">
                                Completed task &quot;Gym workout&quot;
                              </p>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                March 18, 2025 at 6:30 PM
                              </p>
                            </div>
                          </div>

                          <div className="relative pl-6 border-l-2 border-red-500 pb-0">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-500"></div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-slate-900 dark:text-white">
                                Missed deadline for &quot;Read book
                                chapter&quot;
                              </p>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                March 17, 2025 at 9:00 PM
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full border-white/30 bg-white/40"
                        >
                          View All Activity
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="preferences" className="mt-0">
                    <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
                      <CardHeader>
                        <CardTitle className="text-slate-900 dark:text-white">
                          User Preferences
                        </CardTitle>
                        <CardDescription className="text-slate-700 dark:text-slate-300">
                          Customize your personal preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                                Default Task View
                              </h3>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                Choose how tasks are displayed by default
                              </p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              <Button
                                variant="outline"
                                className="border-white/30 bg-white/40 text-slate-900 dark:text-white"
                              >
                                List
                              </Button>
                              <Button
                                variant="outline"
                                className="border-white/30 bg-indigo-500 text-white"
                              >
                                Board
                              </Button>
                              <Button
                                variant="outline"
                                className="border-white/30 bg-white/40 text-slate-900 dark:text-white"
                              >
                                Calendar
                              </Button>
                            </div>
                          </div>

                          <Separator className="bg-white/30" />

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                                Default Task Sort
                              </h3>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                Choose how tasks are sorted by default
                              </p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              <Button
                                variant="outline"
                                className="border-white/30 bg-indigo-500 text-white"
                              >
                                Due Date
                              </Button>
                              <Button
                                variant="outline"
                                className="border-white/30 bg-white/40 text-slate-900 dark:text-white"
                              >
                                Priority
                              </Button>
                              <Button
                                variant="outline"
                                className="border-white/30 bg-white/40 text-slate-900 dark:text-white"
                              >
                                Created
                              </Button>
                            </div>
                          </div>

                          <Separator className="bg-white/30" />

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                                Default Category
                              </h3>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                Set your default task category
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                              <span className="text-sm font-medium text-slate-900 dark:text-white">
                                Work
                              </span>
                            </div>
                          </div>

                          <Separator className="bg-white/30" />

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                                Default Priority
                              </h3>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                Set your default task priority
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                              <span className="text-sm font-medium text-slate-900 dark:text-white">
                                Medium
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white">
                          <Save className="h-4 w-4 mr-2" />
                          Save Preferences
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
