// Icons
import { AlertCircle } from "lucide-react";

// Types
import { TAlertMessage } from "@/types";

// Shadcn
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertMessage({
  variant = "destructive",
  message,
}: TAlertMessage) {
  const alert_title =
    variant === "destructive"
      ? "Error"
      : variant === "success"
      ? "Success"
      : "Info";

  return (
    <Alert variant={variant}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{alert_title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
