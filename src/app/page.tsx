import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500/30 to-indigo-600/30 p-4">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-400/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-amber-400/30 rounded-full blur-3xl" />
      </div>
      <Card className="w-full max-w-md border border-white/30 bg-white/20 backdrop-blur-xl shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="relative w-12 h-12 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">T</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            TaskMaster
          </CardTitle>
          <CardDescription className="text-slate-700 dark:text-slate-200">
            Organize your life, one task at a time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-500" />
            <p>Effortlessly manage your tasks</p>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-500" />
            <p>Collaborate with your team</p>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-500" />
            <p>Track your productivity</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
          >
            {session ? (
              <Link href="/dashboard">Dashboard</Link>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
