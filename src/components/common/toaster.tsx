"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={props.theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/30 group-[.toaster]:backdrop-blur-xl group-[.toaster]:border-white/30 group-[.toaster]:shadow-lg group-[.toaster]:border group-[.toaster]:text-slate-900 dark:group-[.toaster]:text-white",
          title:
            "group-[.toast]:text-slate-900 dark:group-[.toast]:text-white text-sm font-medium",
          description:
            "group-[.toast]:text-slate-700 dark:group-[.toast]:text-slate-300 text-sm",
          actionButton:
            "group-[.toast]:bg-gradient-to-r group-[.toast]:from-teal-500 group-[.toast]:to-indigo-600 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-white/40 group-[.toast]:border-white/30 group-[.toast]:text-slate-900 dark:group-[.toast]:text-white",
          success:
            "group-[.toaster]:bg-emerald-500/20 group-[.toaster]:border-emerald-500/30",
          error:
            "group-[.toaster]:bg-red-500/20 group-[.toaster]:border-red-500/30",
          info: "group-[.toaster]:bg-indigo-500/20 group-[.toaster]:border-indigo-500/30",
          warning:
            "group-[.toaster]:bg-amber-500/20 group-[.toaster]:border-amber-500/30",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
