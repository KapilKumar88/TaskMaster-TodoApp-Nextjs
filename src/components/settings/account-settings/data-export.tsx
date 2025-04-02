"use client";
import { toast as toastV2 } from "@/components/common/sonner";
import { Button } from "@/components/ui/button";
import { ToastVariation } from "@/lib/enums";

export default function ExportData() {
  return (
    <div>
      <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
        Data Export
      </h3>
      <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
        Download a copy of all your data
      </p>
      <Button
        variant="outline"
        className="border-white/30 bg-white/40"
        onClick={() => {
          toastV2({
            message: "Are you sure",
            variation: ToastVariation.DEFAULT,
          });
        }}
      >
        Export Data
      </Button>
    </div>
  );
}
