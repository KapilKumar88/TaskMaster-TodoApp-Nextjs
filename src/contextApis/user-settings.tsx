"use client";

import { ACCENT_COLORS } from "@/lib/constants";
import { AppTheme, Settings } from "@prisma/client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type UserSettingContextType = {
  theme: AppTheme;
  setTheme: Dispatch<SetStateAction<AppTheme>>;
  userSettings: Settings | null;
  setUserSettings: Dispatch<SetStateAction<Settings | null>>;
  accentColor: string;
  setAccentColor: Dispatch<SetStateAction<string>>;
  glassEffectIntensity: number;
  setGlassEffectIntensity: Dispatch<SetStateAction<number>>;
};

const UserSettingContext = createContext<UserSettingContextType | null>(null);

export const UserSettingProvider = ({
  settings,
  children,
}: {
  settings: Settings | null;
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<AppTheme>(AppTheme.system);
  const [accentColor, setAccentColor] = useState<string>(ACCENT_COLORS[0].name);
  const [glassEffectIntensity, setGlassEffectIntensity] = useState<number>(50);
  const [userSettings, setUserSettings] = useState<Settings | null>(settings);

  useEffect(() => {
    if (settings !== null) {
      setTheme(settings.appTheme);
      setAccentColor(settings.accentColor ?? ACCENT_COLORS[0].name);
      setGlassEffectIntensity(settings.glassEffectIntensity);
    }
    setUserSettings(settings);
  }, [settings]);

  useEffect(() => {
    const root = window.document.documentElement;

    const handleThemeChange = (theme: AppTheme) => {
      if (!root) {
        return;
      }
      let tempTheme = theme;
      if (theme === AppTheme.system) {
        tempTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? AppTheme.dark
          : AppTheme.light;
      }
      const isDark = tempTheme === AppTheme.dark;
      const isLight = tempTheme === AppTheme.light;

      root.classList.remove("dark", "light");

      if (isDark || isLight) {
        root.classList.add(tempTheme);
      }
    };

    handleThemeChange(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      userSettings,
      setUserSettings,
      accentColor,
      setAccentColor,
      glassEffectIntensity,
      setGlassEffectIntensity,
    }),
    [
      theme,
      setTheme,
      userSettings,
      setUserSettings,
      accentColor,
      glassEffectIntensity,
      setAccentColor,
      setGlassEffectIntensity,
    ]
  );

  return (
    <UserSettingContext.Provider value={value}>
      {children}
    </UserSettingContext.Provider>
  );
};

export const useUserSettingContext = (): UserSettingContextType => {
  const context = useContext(UserSettingContext);
  if (!context) {
    throw new Error(
      "useUserSettingContext must be used within an UserSettingProvider"
    );
  }
  return context;
};
