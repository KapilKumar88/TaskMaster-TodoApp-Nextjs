"use client";

import { ToastVariation } from "@/lib/enums";
import { AlertTriangle, Check, Info, X } from "lucide-react";
import { Toaster as Sonner, toast as sonnerToast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={props.theme as ToasterProps["theme"]}
      duration={50000}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-white/30 backdrop-blur-xl border-white/30 shadow-lg border text-slate-900 text-white",
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
      icons={{
        success: <Check className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <AlertTriangle className="h-4 w-4" />,
        error: <X className="h-4 w-4" />,
      }}
      {...props}
    />
  );
};

const toast = ({
  message,
  description,
  variation = ToastVariation.DEFAULT,
}: {
  message: string;
  variation?: ToastVariation;
  description?: string;
}) => {
  if (variation === ToastVariation.SUCCESS) {
    sonnerToast.success(message, {
      description: description,
      style: {
        background: "rgba(16, 185, 129, 0.2)",
        border: "1px solid rgba(16, 185, 129, 0.3)",
      },
    });
  } else if (variation === ToastVariation.ERROR) {
    sonnerToast.error(message, {
      description: description,
      style: {
        background: "rgba(239, 68, 68, 0.2)",
        border: "1px solid rgba(239, 68, 68, 0.3)",
      },
    });
  } else if (variation === ToastVariation.INFO) {
    sonnerToast.info(message, {
      description: description,
      style: {
        background: "rgba(99, 102, 241, 0.2)",
        border: "1px solid rgba(99, 102, 241, 0.3)",
      },
    });
  } else if (variation === ToastVariation.WARNING) {
    sonnerToast.warning(message, {
      description: description,
      style: {
        background: "rgba(245, 158, 11, 0.2)",
        border: "1px solid rgba(245, 158, 11, 0.3)",
      },
    });
  } else if (variation === ToastVariation.ACTION) {
    sonnerToast(message, {
      description: description,
      action: {
        label: "Delete",
        onClick: () => console.log("Deleted"),
      },
      cancel: {
        label: "Cancel",
        onClick: () => console.log("Canceled"),
      },
      style: {
        border: "1px solid rgba(255, 255, 255, 0.3)",
        background: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(24px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    });
  } else {
    sonnerToast(message, {
      description: description,
      icon: <Check className="h-4 w-4 text-emerald-500" />,
      style: {
        border: "1px solid rgba(255, 255, 255, 0.3)",
        background: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(24px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    });
  }
};

export { Toaster, toast };
