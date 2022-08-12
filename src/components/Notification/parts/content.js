import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NotificationSubContent from "./subContent";

const NotificationContent = ({ isFull = false }) => {
  const history = useHistory();
  const { notifications } = useSelector((state) => state.notification);
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
        <div className="notification-list">
          {notifications.new.notifications.map((item) => (
            <NotificationSubContent key={item.code} item={item} />
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
              <NotificationSubContent key={item.code} item={item} />
            ))}
          </div>
        ) : (
          <div className="notification-list">
            {notifications.earlier.notifications.slice(0, 4).map((item) => (
              <NotificationSubContent key={item.code} item={item} />
            ))}
          </div>
        )}
      </div>
      <div
        onClick={() => history.push("/dashboard/notification")}
        className="notification-view-all"
      >
        View All
      </div>
    </>
  );
};

export default React.memo(NotificationContent);
