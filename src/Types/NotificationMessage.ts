export interface NotificationMessage {
  type: "error" | "info" | "success" | "warning";
  message: string;
  title: string;
}
