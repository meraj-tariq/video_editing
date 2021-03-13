import "react-notifications/lib/notifications.css";
import { NotificationMessage } from "../../Types/NotificationMessage";
import { NotificationActionTypes } from "../Actions/ActionTypes";

type State = NotificationMessage | null;
const notificationReducer = (state: State = null, action: any): State => {
  switch (action.type) {
    case NotificationActionTypes.INFO:
      return {
        type: "info",
        message: action.message,
        title: action.title,
      };
    case NotificationActionTypes.ERROR:
      return {
        type: "error",
        message: action.message,
        title: action.title,
      };
    case NotificationActionTypes.SUCCESS:
      return {
        type: "success",
        message: action.message,
        title: action.title,
      };
    case NotificationActionTypes.WARNING:
      return {
        type: "warning",
        message: action.message,
        title: action.title,
      };
    default:
      return state;
  }
};

export default notificationReducer;
