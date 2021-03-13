import { NotificationActionTypes } from './ActionTypes';


class Notify {
  static info(message:string, title = 'Information') {
    return {
      type: NotificationActionTypes.INFO,
      title,
      message,
    };
  }

  static success(message:string, title = 'Success') {
    return {
      type: NotificationActionTypes.SUCCESS,
      title,
      message,
    };
  }

  static error(message:string, title = 'Error') {
    return {
      type: NotificationActionTypes.ERROR,
      title,
      message,
    };
  }

  static warning(message:string, title = 'Warning') {
    return {
      type: NotificationActionTypes.WARNING,
      title,
      message,
    };
  }
}
export default Notify;
