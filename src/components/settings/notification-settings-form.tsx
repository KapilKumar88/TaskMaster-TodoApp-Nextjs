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
import { LoaderPinwheel, Save } from "lucide-react";
import { useUserSettingContext } from "@/contextApis/user-settings";
import { useActionState, useEffect, useState } from "react";
import { saveNotificationSettingsAction } from "@/server-actions/settings.actions";
import { toast } from "sonner";

export default function NotificationSettingsForm() {
  const { userSettings } = useUserSettingContext();
  const [
    notificationSettingsState,
    notificationSettingsAction,
    notificationSettingsPending,
  ] = useActionState(saveNotificationSettingsAction, {
    errors: {},
    message: "",
    success: false,
  });

  const [trackFormData, setTrackFormData] = useState<{
    emailNotifications: boolean;
    pushNotification: boolean;
    taskDueReminder: boolean;
    taskDueTime: string;
    weeklySummary: boolean;
  }>({
    emailNotifications: userSettings?.emailNotifications ?? false,
    pushNotification: userSettings?.pushNotification ?? false,
    taskDueReminder: userSettings?.taskDueReminder ?? false,
    taskDueTime: userSettings?.taskDueReminder
      ? `${userSettings.taskDueTime} ${userSettings?.taskDueTimeFrequency}`
      : "1 day",
    weeklySummary: userSettings?.weeklySummary ?? false,
  });

  useEffect(() => {
    if (notificationSettingsState?.errors) {
      if (notificationSettingsState.errors?.general) {
        toast.error(notificationSettingsState.errors.general);
        return;
      }
    }

    if (notificationSettingsState?.success) {
      toast.success(notificationSettingsState.message);
    }
  }, [notificationSettingsState]);

  return (
    <form
      className="space-y-4"
      action={(formData: FormData) => {
        notificationSettingsAction(formData);
      }}
    >
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
          <Switch
            name="emailNotifications"
            id="email-notifications"
            checked={trackFormData?.emailNotifications}
            onCheckedChange={(value) => {
              setTrackFormData((previousState) => {
                return {
                  ...previousState,
                  emailNotifications: value,
                };
              });
            }}
          />
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
          <Switch
            name="pushNotifications"
            id="push-notifications"
            checked={trackFormData?.pushNotification}
            onCheckedChange={(value) => {
              setTrackFormData((previousState) => {
                return {
                  ...previousState,
                  pushNotification: value,
                };
              });
            }}
          />
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
            <Switch
              name="taskDueReminders"
              id="due-reminders"
              checked={trackFormData?.taskDueReminder}
              onCheckedChange={(value) => {
                setTrackFormData((previousState) => {
                  return {
                    ...previousState,
                    taskDueReminder: value,
                  };
                });
              }}
            />
            <Select
              defaultValue={trackFormData.taskDueTime}
              name="taskDueTime"
              disabled={!trackFormData?.taskDueReminder}
              onValueChange={(value) => {
                setTrackFormData((previousState) => {
                  return {
                    ...previousState,
                    taskDueTime: value,
                  };
                });
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px] border-white/30 bg-white/40">
                <SelectValue placeholder="Select reminder time" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
                <SelectItem value="1 hour">1 hour before</SelectItem>
                <SelectItem value="3 hour">3 hours before</SelectItem>
                <SelectItem value="1 day">1 day before</SelectItem>
                <SelectItem value="2 day">2 days before</SelectItem>
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
          <Switch
            name="weeklySummary"
            id="weekly-summary"
            checked={trackFormData?.weeklySummary}
            onCheckedChange={(value) => {
              setTrackFormData((previousState) => {
                return {
                  ...previousState,
                  weeklySummary: value,
                };
              });
            }}
          />
        </div>
      </div>
      <Button
        type="submit"
        className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
      >
        {notificationSettingsPending && (
          <>
            <LoaderPinwheel className="mr-2 h-8 w-8 animate-spin" />
            Saving...
          </>
        )}
        {!notificationSettingsPending && (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </>
        )}
      </Button>
    </form>
  );
}
