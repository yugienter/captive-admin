import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeVisibleNotification } from "../actions";
import NotificationSubContent from "./subContent";

const NotificationContent = ({ isFull = false }) => {
  const history = useHistory();
  const { notifications } = useSelector((state) => state.notification);

  const dispatch = useDispatch();
  const onViewAll = () => {
    history.push("/dashboard/notification")
    dispatch(changeVisibleNotification(false));
  }

  return (
    <>
      <div className="new-section">
        <h3>
          New{" "}
          {notifications.new.totalUnclicked > 0 && (
            <span className="new-total">
              {notifications.new.totalUnclicked}
            </span>
          )}
        </h3>
        <div className="notification-list notification-list-new">
          {notifications.new.notifications.map((item) => (
            <NotificationSubContent key={item.notificationCode} item={item} />
          ))}
        </div>
      </div>
      <div className="new-section">
        <h3>
          Earlier{" "}
          {notifications.earlier.totalUnclicked > 0 && (
            <span className="new-total">
              {notifications.earlier.totalUnclicked}
            </span>
          )}
        </h3>
        {isFull ? (
          <div className="notification-list">
            {notifications.earlier.notifications.map((item) => (
              <NotificationSubContent key={item.notificationCode} item={item} />
            ))}
          </div>
        ) : (
          <div className="notification-list">
            {notifications.earlier.notifications.slice(0, 4).map((item) => (
              <NotificationSubContent key={item.notificationCode} item={item} />
            ))}
          </div>
        )}
      </div>
      {(notifications.new.notifications.length > 0 ||
        notifications.earlier.notifications.length > 0) && (
        <div
          onClick={onViewAll}
          className="notification-view-all"
        >
          View All
        </div>
      )}
    </>
  );
};

export default React.memo(NotificationContent);
