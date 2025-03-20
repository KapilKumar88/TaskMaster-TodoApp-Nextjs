"use client";
import {
  createContext,
  Dispatch,
  JSX,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export type SideBarContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const SideBarContext = createContext<SideBarContextType | null>(null);

export const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
    }),
    [sidebarOpen, setSidebarOpen]
  );

  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
};

export const useSideBarContext = (): SideBarContextType => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error(
      "useSideBarContext must be used within an SidebarContextProvider"
    );
  }
  return context;
};
