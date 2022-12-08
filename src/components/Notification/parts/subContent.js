import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { NoClickIcon } from "../icon";
import {
  getNotificationTotal,
  getNotificationData,
  notificationClick,
  changeVisibleNotification,
} from "../actions";
import React from "react";
import { NOTIFICATION_GROUP, NOTIFICATION_GROUP_TEXT } from "../constants";
import { mediaUrl, paginationData } from "../../../api/action";
import { useHistory } from "react-router-dom";
import dataActions from "@iso/redux/payment/actions";
const { setSelectedPayment } = dataActions;

const NotificationSubContent = ({ item }) => {
  const history = useHistory();
  const { tab } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const getPayment = async (page) => {
    const data = await paginationData("admin/payments", page, 10);
    return data.data;
  };

  const findPayment = async (paymentCode) => {
    const firstData = await getPayment(0);
    if (!firstData) return;
    const total = firstData?.total ?? 0;
    const page = Math.ceil(total / 10);
    let payment = firstData.data.find((item) => item.code === paymentCode);
    if (!payment) {
      for (let i = 0; i < page; i++) {
        const data = await getPayment(i + 1);
        payment = data.data.find((item) => item.code === paymentCode);
        if (payment) break;
      }
    }
    if (!payment) return;
    dispatch(setSelectedPayment(payment));
    return payment;
  };

  const onClickNotification = async () => {
    switch (item.group) {
      case NOTIFICATION_GROUP.OrderNPayment:
        history.push(`/dashboard/payment-manage`);
        findPayment(item.metadata.paymentCode);
        break;

      default:
        break;
    }
    dispatch(changeVisibleNotification(false));
    if (item.clickedAt) return;
    await notificationClick(item.notificationCode);
    dispatch(getNotificationTotal());
    dispatch(getNotificationData(tab, 10, 1));
  };

  const getAvatar = () => {
    if (item?.source?.avatar) {
      return mediaUrl(item.source.avatar);
    }
    if (item.group === NOTIFICATION_GROUP.System) {
      return "https://via.placeholder.com/150";
    }
    return "https://via.placeholder.com/150";
  };

  const getMessage = () => {
    if (item.eventName === "payment.banking") {
      return `You have received an unverified payment <b>PO${item.metadata.paymentCode}</b> from <b>${item.source.name}</b> for <b>“${item.metadata.productName}”</b>. Please verify the payment here.`;
    }
    if (item.eventName === "payment.banking.fixed") {
      return `You have received an unverified fixed-rate payment <b>PF${item.metadata.paymentCode}</b> from <b>${item.source.name}</b> for <b>“${item.metadata.productName}”</b>. Please verify the payment here.`;
    }
    if (item.eventName === "payment.paynow") {
      return `You have received a new payment <b>PO${item.metadata.paymentCode}</b> from <b>${item.source.name}</b> for <b>“${item.metadata.productName}”</b>. View the payment here.`;
    }
    if (item.eventName === "payment.paynow.fixed") {
      return `You have received a new fixed-rate payment <b>PF${item.metadata.paymentCode}</b> from <b>${item.source.name}</b> for <b>“${item.metadata.productName}”</b>. View the payment here.`;
    }
    if (
      item.group === NOTIFICATION_GROUP.System &&
      item.eventName === "campaign.live"
    ) {
      return `<b>${item.metadata.productName}</b> has a new campaign. Check it out here!`;
    }
    return "";
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
        <img className="notification-avatar" src={getAvatar()} alt="avatar" />
      </div>
      <div
        className={
          "notification-item-right " +
          (item.clickedAt ? "notification-is-read" : "")
        }
      >
        <h4 dangerouslySetInnerHTML={{ __html: getMessage() }} />
        <div className="notification-footer">
          <span className="notification-time">
            {moment(item.createdAt).fromNow()}
          </span>{" "}
          -{" "}
          <span className="notification-type-text">
            {NOTIFICATION_GROUP_TEXT[item.group]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NotificationSubContent);
