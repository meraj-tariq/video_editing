import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// @ts-ignore
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { RootState } from "../../Store/Reducers";

const NotificationMessageRenderer = () => {
  const message = useSelector((state: RootState) => state.notificationMessage);

  useEffect(() => {
    if (message) {
      NotificationManager[message.type](message.message, message.title);
    }
  }, [message]);
  return <NotificationContainer />;
};

export default NotificationMessageRenderer;
