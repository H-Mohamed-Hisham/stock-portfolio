// Types
import { TDeleteDialog } from "@/types";

// Shadcn
import { buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DeleteAlertDialog({
  deleteDialog,
  setDeleteDialog,
  deleteCallback,
}: {
  deleteDialog: TDeleteDialog;
  setDeleteDialog: React.Dispatch<React.SetStateAction<TDeleteDialog>>;
  deleteCallback: () => void;
}) {
  return (
    <AlertDialog
      open={deleteDialog.open}
      onOpenChange={(value) =>
        setDeleteDialog({
          ...deleteDialog,
          open: value,
        })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => deleteCallback()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
