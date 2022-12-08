import React, { useEffect, useRef, useState } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import {
  changeTab,
  getNotificationData,
  changePage,
} from "@iso/components/Notification/actions";
import NotificationContent from "@iso/components/Notification/parts/content";
import Box from "@iso/components/utility/box";
import ContentHolder from "@iso/components/utility/contentHolder";
import {
  ComponentTitle,
  TitleWrapper,
} from "./View.styles";
import "./styles.css";

const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );
  useEffect(() => {
    if (!observer) return;
    if (!ref || !ref.current) return;
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return isIntersecting;
};

const { TabPane } = Tabs;
const NotificationPage = () => {
  const { total, tab, notificationPage, notifications } = useSelector(
    (state) => state.notification
  );
  const dispatch = useDispatch();
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  const loadMore = () => {
    const total =
      notifications.new.notifications.length +
      notifications.earlier.notifications.length;
    if (notifications.total <= total) return;
    dispatch(changePage(notificationPage + 1));
    dispatch(getNotificationData(tab, 10, notificationPage + 1));
  };

  useEffect(() => {
    dispatch(getNotificationData(tab, 10, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  useEffect(() => {
    console.log(isVisible);
    if (isVisible) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <LayoutContentWrapper>
      <Box>
        <ContentHolder style={{ marginTop: 0, overflow: "hidden" }}>
          <TitleWrapper>
            <ComponentTitle>Notifications</ComponentTitle>
          </TitleWrapper>
          <div className="host-list-page">
            <div className="notification-section">
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
                  <NotificationContent isFull={true} />
                </TabPane>
                {/* <TabPane
                  tab={
                    <div className="notification-tab">
                      Chat{" "}
                      {total.groups.chats > 0 && (
                        <span className="notification-total">
                          {total.groups.chats}
                        </span>
                      )}
                    </div>
                  }
                  key="chat"
                >
                  <NotificationContent isFull={true} />
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
                  <NotificationContent isFull={true} />
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
                  <NotificationContent isFull={true} />
                </TabPane> */}
                {/* <TabPane
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
                  <NotificationContent isFull={true} />
                </TabPane> */}
              </Tabs>
            </div>
            <div ref={ref} className="opacity-0">
              View more
            </div>
          </div>
        </ContentHolder>
      </Box>
    </LayoutContentWrapper>
  );
};

export default NotificationPage;
