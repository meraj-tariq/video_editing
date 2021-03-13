import { NotificationManager } from "react-notifications";

type TNotify = "info" | "success" | "warning" | "error";

export const Notifier = (type: TNotify, message: string) => {
  switch (type) {
    case "info":
      return NotificationManager.info(message, "Information");
    case "success":
      return NotificationManager.success(message, "Success");
    case "warning":
      return NotificationManager.warning(message, "Warning");
    case "error":
      return NotificationManager.error(message, "Error");
  }
};
