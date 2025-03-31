"use client";

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

  useEffect(() => {
    if (settings !== null) {
      if (settings.appTheme === AppTheme.system) {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? AppTheme.dark
          : AppTheme.light;
        setTheme(systemTheme);
      } else {
        setTheme(settings.appTheme);
      }
    }
  }, [settings]);

  useEffect(() => {
    const root = window.document.documentElement;

    const handleThemeChange = (theme: AppTheme) => {
      if (!root) {
        return;
      }

      const isDark = theme === AppTheme.dark;
      const isLight = theme === AppTheme.light;

      root.classList.remove("dark", "light");

      if (isDark || isLight) {
        root.classList.add(theme);
      }
    };

    handleThemeChange(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
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
