'use client';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Check, LoaderPinwheel, Moon, Palette, Save, Sun } from "lucide-react";
import { useUserSettingContext } from "@/contextApis/user-settings";
import { AppTheme } from "@prisma/client";
import { useActionState, useEffect } from "react";
import { saveAppearanceSettingsAction } from "@/server-actions/settings.actions";
import { toast } from "sonner";
import { ACCENT_COLORS } from "@/lib/constants";

export default function AppearanceSettingsForm() {
  const {
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    glassEffectIntensity,
    setGlassEffectIntensity,
  } = useUserSettingContext();

  const [
    appearanceSettingsState,
    appearanceSettingsAction,
    appearanceSettingsPending,
  ] = useActionState(saveAppearanceSettingsAction, {
    errors: {},
    message: "",
    success: false,
  });

  useEffect(() => {
    if (appearanceSettingsState?.errors) {
      if (appearanceSettingsState.errors?.general) {
        toast.error(appearanceSettingsState.errors.general);
        return;
      }
    }

    if (appearanceSettingsState?.success) {
      toast.success(appearanceSettingsState.message);
    }
  }, [appearanceSettingsState]);

  return (
    <form
      className="space-y-4"
      action={(formData: FormData) => {
        formData.append("theme", theme);
        formData.append("accentColor", accentColor);
        formData.append(
          "glassEffectIntensity",
          glassEffectIntensity.toString()
        );
        appearanceSettingsAction(formData);
      }}
    >
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
              onClick={() => setTheme(AppTheme.light)}
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
              onClick={() => setTheme(AppTheme.dark)}
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
              onClick={() => setTheme(AppTheme.system)}
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
            {ACCENT_COLORS.map((color, index) => (
              <button
                key={`${index}-${color.name}-color`}
                type="button"
                className={`w-8 h-8 rounded-full ${color.class} ring-2 ${
                  accentColor === color.name ? "ring-white" : "ring-white/0"
                } cursor-pointer transition-all hover:scale-110`}
                onClick={() => setAccentColor(color.name)}
              ></button>
            ))}
          </div>
        </div>

        <Separator className="bg-white/30" />

        <div>
          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
            Glass Effect Intensity
          </h3>
          <Slider
            defaultValue={[glassEffectIntensity]}
            max={100}
            step={10}
            className="w-full"
            onValueChange={(values) => {
              setGlassEffectIntensity(values[0]);
            }}
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
            Current glass effect: {glassEffectIntensity}%
          </p>
          <div
            className="mt-3 p-4 rounded-lg border border-white/30 bg-white/30 backdrop-blur-sm"
            style={{
              backdropFilter: `blur(${Math.round(
                glassEffectIntensity / 10
              )}px)`,
              backgroundColor: `rgba(255, 255, 255, ${
                (glassEffectIntensity / 100) * 0.3
              })`,
            }}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300">
              This is a preview of how the glass effect will look with the
              current intensity.
            </p>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white sm:w-[160px]"
        disabled={appearanceSettingsPending}
      >
        {appearanceSettingsPending && (
          <>
            <LoaderPinwheel className="mr-2 h-8 w-8 animate-spin" />
            Saving...
          </>
        )}
        {!appearanceSettingsPending && (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </>
        )}
      </Button>
    </form>
  );
}
