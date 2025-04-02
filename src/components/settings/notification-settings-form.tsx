import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { Save } from "lucide-react";

export default function NotificationSettingsForm() {
  return (
    <form className="space-y-4">
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
                <SelectItem value="3hours">3 hours before</SelectItem>
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
      <Button className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white">
        <Save className="h-4 w-4 mr-2" />
        Save Changes
        {/* {generalSettingsPending && (
          <>
            <LoaderPinwheel className="mr-2 h-8 w-8 animate-spin" />
            Saving...
          </>
        )}
        {!generalSettingsPending && (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </>
        )} */}
      </Button>
    </form>
  );
}
