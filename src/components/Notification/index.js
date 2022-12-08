import { Tabs } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationContent from "./parts/content";
import { changeTab, getNotificationData } from "./actions";
import "./styles.css";

const { TabPane } = Tabs;
const NotificationPopover = () => {
  const { total, tab } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationData(tab, 10, 1));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <>
      <Tabs
        className="notification-tabs"
        activeKey={tab}
        onChange={(key) => dispatch(changeTab(key))}
      >
        <TabPane
          tab={
            <div className="notification-tab">
              All{" "}
              {total.totalUnclicked > 0 && (
                <span className="notification-total">
                  {total.totalUnclicked}
                </span>
              )}
            </div>
          }
          key="all"
        >
          <NotificationContent />
        </TabPane>
        {/* <TabPane
          tab={
            <div className="notification-tab">
              Chat{" "}
              {total.groups.chats > 0 && (
                <span className="notification-total">{total.groups.chats}</span>
              )}
            </div>
          }
          key="chat"
        >
          <NotificationContent />
        </TabPane> */}
        <TabPane
          tab={
            <div className="notification-tab">
              Order & Payment{" "}
              {total.groups.orderNPayment > 0 && (
                <span className="notification-total">
                  {total.groups.orderNPayment}
                </span>
              )}
            </div>
          }
          key="orderNPayment"
        >
          <NotificationContent />
        </TabPane>
        {/* <TabPane
          tab={
            <div className="notification-tab">
              Pitch/Proposal{" "}
              {total.groups.pitchProposal > 0 && (
                <span className="notification-total">
                  {total.groups.pitchProposal}
                </span>
              )}
            </div>
          }
          key="pitchProposal"
        >
          <NotificationContent />
        </TabPane>
        <TabPane
          tab={
            <div className="notification-tab">
              Others{" "}
              {total.groups.system > 0 && (
                <span className="notification-total">
                  {total.groups.system}
                </span>
              )}
            </div>
          }
          key="system"
        >
          <NotificationContent />
        </TabPane> */}
      </Tabs>
    </>
  );
};

export default NotificationPopover;
