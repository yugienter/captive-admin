import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { NoClickIcon } from "../icon";
import {
  getNotificationTotal,
  getNotificationData,
  notificationClick,
} from "../actions";
import React from "react";
import { NOTIFICATION_GROUP, NOTIFICATION_GROUP_TEXT } from "../constants";

const NotificationSubContent = ({ item }) => {
  const { tab } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const onClickNotification = async () => {
    if (item.clickedAt) return;
    await notificationClick(item.code);
    dispatch(getNotificationTotal());
    dispatch(getNotificationData(tab, 10, 0));
  };

  return (
    <div
      key={item.code}
      onClick={onClickNotification}
      className={"notification-item " + item.group}
    >
      <div className="notification-item-left">
        {!item.clickedAt && (
          <div className="notification-no-click-icon">
            <NoClickIcon />
          </div>
        )}
        <img
          className="notification-avatar"
          src="https://via.placeholder.com/150"
          alt="avatar"
        />
      </div>
      <div
        className={
          "notification-item-right " +
          (item.clickedAt ? "notification-is-read" : "")
        }
      >
        <h4 dangerouslySetInnerHTML={{ __html: item.message }} />
        <div className="notification-footer">
          <span className="notification-time">{moment().fromNow()}</span> -{" "}
          <span className="notification-type-text">{NOTIFICATION_GROUP_TEXT[item.group]}</span>
        </div>
        {item.group === NOTIFICATION_GROUP.OrderNPayment && (
          <div className="notification-sub-footer">
            <button className="btn-order">View Orders</button>
            <button className="btn-payment">View Payment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(NotificationSubContent);
