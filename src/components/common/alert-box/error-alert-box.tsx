import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function ErrorAlertDialogBox({
  open,
  dialogTitle,
  dialogDescription,
  onConfirm,
  onCancel,
}: Readonly<{
  open: boolean;
  dialogTitle: string;
  dialogDescription: string;
  onConfirm: () => void;
  onCancel: () => void;
}>) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="sm:max-w-[550px] bg-white/80 backdrop-blur-xl border-white/30">
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="border-white/30 bg-white/40"
            onClick={onCancel}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
