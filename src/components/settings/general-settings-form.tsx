import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronDown, LoaderPinwheel, Save } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { useUserSettingContext } from "@/contextApis/user-settings";
import { TimeFrequency, WeekStartDay } from "@prisma/client";
import { updateUserGeneralSettingsAction } from "@/server-actions/settings.actions";
import { GeneralSettingsFormState } from "@/lib/interfaces/server-action.interface";
import { toast } from "sonner";
import moment from "moment-timezone";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

export default function GeneralSettingsForm() {
  const timeZoneList = moment.tz.names();
  const { userSettings } = useUserSettingContext();
  const [generalSettingsState, generalSettingsAction, generalSettingsPending] =
    useActionState<GeneralSettingsFormState, FormData>(
      updateUserGeneralSettingsAction,
      {
        errors: {},
        message: "",
        success: false,
      }
    );

  const [openTimeZonePopup, setOpenTimeZonePopup] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{
    timeZone?: string;
    dateFormat?: string;
    weekStartDay?: string;
    autoArchive?: string;
    autoArchiveTime?: string;
    timeFrequency?: string;
  }>({
    timeZone: undefined,
    dateFormat: undefined,
    weekStartDay: undefined,
    autoArchive: undefined,
    autoArchiveTime: undefined,
    timeFrequency: undefined,
  });

  const [trackFormData, setTrackFormData] = useState<{
    timeZone?: string;
    dateFormat?: string;
    weekStartDay?: WeekStartDay;
    autoArchive?: boolean;
    autoArchiveTime?: number;
    timeFrequency?: TimeFrequency;
  }>({
    timeZone: userSettings?.timeZone ?? "",
    dateFormat: userSettings?.dateFormat ?? "",
    weekStartDay: userSettings?.weekStartDay ?? WeekStartDay.sunday,
    autoArchive: userSettings?.autoArchive ?? false,
    autoArchiveTime: userSettings?.autoArchiveTime ?? 30,
    timeFrequency: userSettings?.autoArchiveTimeFrequency ?? TimeFrequency.day,
  });

  useEffect(() => {
    if (generalSettingsState?.errors) {
      setFormErrors({
        ...formErrors,
        timeZone:
          Array.isArray(generalSettingsState?.errors?.timeZone) &&
          generalSettingsState.errors.timeZone?.length > 0
            ? generalSettingsState.errors.timeZone[0]
            : undefined,
        dateFormat:
          Array.isArray(generalSettingsState?.errors?.dateFormat) &&
          generalSettingsState.errors.dateFormat?.length > 0
            ? generalSettingsState.errors.dateFormat[0]
            : undefined,
        weekStartDay:
          Array.isArray(generalSettingsState?.errors?.weekStartDay) &&
          generalSettingsState.errors.weekStartDay?.length > 0
            ? generalSettingsState.errors.weekStartDay[0]
            : undefined,
        autoArchive:
          Array.isArray(generalSettingsState?.errors?.autoArchive) &&
          generalSettingsState.errors.autoArchive?.length > 0
            ? generalSettingsState.errors.autoArchive[0]
            : undefined,
        autoArchiveTime:
          Array.isArray(generalSettingsState?.errors?.autoArchiveTime) &&
          generalSettingsState.errors.autoArchiveTime?.length > 0
            ? generalSettingsState.errors.autoArchiveTime[0]
            : undefined,
        timeFrequency:
          Array.isArray(generalSettingsState?.errors?.timeFrequency) &&
          generalSettingsState.errors.timeFrequency?.length > 0
            ? generalSettingsState.errors.timeFrequency[0]
            : undefined,
      });

      if (generalSettingsState.errors?.general) {
        toast.error(generalSettingsState.errors.general);
        return;
      }
    }

    if (generalSettingsState?.success) {
      toast.success(generalSettingsState.message);
    }
  }, [generalSettingsState]);

  return (
    <form
      className="space-y-4"
      action={(formData: FormData) => {
        formData.append("timeZone", trackFormData.timeZone ?? "");
        generalSettingsAction(formData);
      }}
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">
              Time Zone
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Set your local time zone for accurate due dates
            </p>
            {formErrors?.timeZone && (
              <p className="text-red-500 text-sm">{formErrors?.timeZone}</p>
            )}
          </div>
          <Popover
            open={openTimeZonePopup}
            onOpenChange={(eve) => {
              setOpenTimeZonePopup(eve);
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-[280px] justify-between border-white/30 bg-white/40"
              >
                <span className="truncate">{trackFormData.timeZone}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full sm:w-[280px] p-0 bg-white/90 backdrop-blur-xl border-white/30">
              <Command>
                <CommandInput
                  placeholder="Search time zone..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No time zone found.</CommandEmpty>
                  {/* Update the CommandItem to use the handler */}
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {timeZoneList.map((tz) => (
                      <CommandItem
                        key={tz}
                        value={tz}
                        onSelect={() => {
                          setTrackFormData((previousState) => {
                            return {
                              ...previousState,
                              timeZone: tz,
                            };
                          });
                          setOpenTimeZonePopup(false);
                        }}
                        className="cursor-pointer"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            trackFormData?.timeZone === tz
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <span>{tz}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Separator className="bg-white/30" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">
              Date Format
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Choose how dates are displayed
            </p>
            {formErrors?.dateFormat && (
              <p className="text-red-500 text-sm">{formErrors?.dateFormat}</p>
            )}
          </div>
          <Select
            name="dateFormat"
            defaultValue={userSettings?.dateFormat ?? ""}
            value={trackFormData.dateFormat}
            onValueChange={(e) =>
              setTrackFormData((previousState) => {
                return { ...previousState, dateFormat: e };
              })
            }
          >
            <SelectTrigger className="w-full sm:w-[280px] border-white/30 bg-white/40">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
              <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
              <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
              <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-white/30" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">
              Week Start
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Set which day your week starts on
            </p>
            {formErrors?.weekStartDay && (
              <p className="text-red-500 text-sm">{formErrors?.weekStartDay}</p>
            )}
          </div>
          <Select
            name="weekStartDay"
            defaultValue="sunday"
            value={trackFormData.weekStartDay}
            onValueChange={(e) =>
              setTrackFormData((previousState) => {
                return {
                  ...previousState,
                  weekStartDay: e as WeekStartDay,
                };
              })
            }
          >
            <SelectTrigger className="w-full sm:w-[280px] border-white/30 bg-white/40">
              <SelectValue placeholder="Select start day" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
              <SelectItem value={WeekStartDay.sunday}>Sunday</SelectItem>
              <SelectItem value={WeekStartDay.monday}>Monday</SelectItem>
              <SelectItem value={WeekStartDay.saturday}>Saturday</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-white/30" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">
              Auto Archive
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Automatically archive completed tasks after a period
            </p>
            {formErrors?.autoArchive && (
              <p className="text-red-500 text-sm">{formErrors?.autoArchive}</p>
            )}
            {formErrors?.autoArchiveTime && (
              <p className="text-red-500 text-sm">
                {formErrors?.autoArchiveTime}
              </p>
            )}
            {formErrors?.timeFrequency && (
              <p className="text-red-500 text-sm">
                {formErrors?.timeFrequency}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 sm:flex-row flex-col">
            <Switch
              name="autoArchive"
              id="auto-archive"
              defaultChecked={userSettings?.autoArchive}
              checked={trackFormData.autoArchive}
              onCheckedChange={(e) => {
                setTrackFormData((previousState) => {
                  return {
                    ...previousState,
                    autoArchive: e,
                  };
                });
              }}
            />
            <Select
              name="autoArchiveTime"
              defaultValue={
                userSettings?.autoArchive
                  ? `${userSettings?.autoArchiveTime} ${userSettings?.autoArchiveTimeFrequency}`
                  : ""
              }
              disabled={!trackFormData.autoArchive}
              value={`${trackFormData.autoArchiveTime} ${trackFormData.timeFrequency}`}
              onValueChange={(e) => {
                setTrackFormData((previousState) => {
                  const temp = e.split(" ");
                  return {
                    ...previousState,
                    autoArchiveTime: parseInt(temp[0]),
                    timeFrequency: temp[1] as TimeFrequency,
                  };
                });
              }}
            >
              <SelectTrigger className="w-full sm:w-[280px] border-white/30 bg-white/40">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
                <SelectItem value="7 day">After 7 days</SelectItem>
                <SelectItem value="14 day">After 14 days</SelectItem>
                <SelectItem value="30 day">After 30 days</SelectItem>
                <SelectItem value="90 day">After 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Button
        className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white sm:w-[160px]"
        disabled={generalSettingsPending}
      >
        {generalSettingsPending && (
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
        )}
      </Button>
    </form>
  );
}
