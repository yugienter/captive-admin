import {
  ApproveIcon,
  AttachmentIcon,
  MoreIcon,
  OrderDropDown,
  QrCodeIcon,
  RejectIcon,
  RejectInfoIcon,
} from "./Icon";
import { Checkbox, Dropdown, Menu, Table, Tooltip } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Image from "@iso/components/Image";
import dataActions from "@iso/redux/payment/actions";
import { formatMoney } from "../../library/helpers/format";
import { mediaUrl } from "@api/action";
import moment from "moment";
import { orderStatus } from "@iso/config/orderStatus";

const {
  selectedPaymentUpdate,
  selectedOrderUpdate,
  approveItemsUpdate,
  rejectItemsUpdate,
  toggleModal,
} = dataActions;

export default function PaymentItem({ payment, filterStatus }) {
  const [expanded, setExpanded] = useState(false);
  const { selectedPayment, selectedOrder } = useSelector(
    (state) => state.Payment
  );
  const dispatch = useDispatch();

  const paymentStatus = {
    submitted: "Pending Payment",
    approved: "Paid",
    rejected: "Canceled",
  };

  const handleCheckPayment = (event) => {
    const listOrderCodes = payment.orders
    .filter((order) => order.status === "submitted")
    .map((order) => order.code);
    let newSelectedPayment = selectedPayment;
    let newSelectedOrder = selectedOrder;
    if (event.target.checked) {
      newSelectedPayment.push(payment.code);
      newSelectedOrder = [...selectedOrder, ...listOrderCodes];
    } else {
      newSelectedPayment = newSelectedPayment.filter(
        (item) => item !== payment.code
      );
      newSelectedOrder = newSelectedOrder.filter(
        (item) => !listOrderCodes.includes(item)
      );
    }
    dispatch(selectedPaymentUpdate(newSelectedPayment));
    dispatch(selectedOrderUpdate(newSelectedOrder));
  };

  const handleCheckOrder = (event, code) => {
    let newSelectedOrder = selectedOrder;
    if (event.target.checked) {
      newSelectedOrder.push(code);
    } else {
      newSelectedOrder = newSelectedOrder.filter((item) => item !== code);
    }
    dispatch(selectedOrderUpdate(newSelectedOrder));
  };

  const approveItem = (item) => {
    dispatch(approveItemsUpdate([item.code]));
  };

  const rejectItem = (item) => {
    dispatch(rejectItemsUpdate([item.code]));
  };

  const viewPayment = () => {
    dispatch(toggleModal(payment));
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={viewPayment}>View payment</Menu.Item>
      <Menu.Item>Show in Job List</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "",
      dataIndex: "code",
      key: "code",
      align: "center",
      render: (text, row) => {
        if (row.status === "submitted") 
          return <Checkbox
            onChange={(value) => handleCheckOrder(value, text)}
            checked={selectedOrder.includes(text)}
          ></Checkbox>;
        return <div></div>;
      },
    },
    {
      title: "Order Id",
      dataIndex: "code",
      align: "center",
      sorter: (a, b) => parseInt(a.code) > parseInt(b.code),
      key: "code",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
      sorter: (a, b) => (parseInt(a.quantity) > parseInt(b.quantity) ? 1 : -1),
      key: "quantity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      render: (text, row) => {
        return (
          <span
            className={"inline-flex justify-center order-status order-" + text}
          >
            {orderStatus[text]}{" "}
            {text === "rejected" && (
              <Tooltip placement="top" title={row.reason}>
                <div>
                  &nbsp;
                  <RejectInfoIcon />
                </div>
              </Tooltip>
            )}
          </span>
        );
      },
    },
    {
      title: "Consumer Name",
      dataIndex: "consumerName",
      key: "consumerName",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Delivery Address",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
      width: 200,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => moment(a.createdAt).isBefore(moment(b.createdAt)),
      render: (text, row) => {
        return moment(text).format("DD MMM, YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "a",
      key: "",
      align: "center",
      render: (_, row) => {
        return (
          row.status === "submitted" && (
            <div className="action-row">
              <div onClick={() => approveItem(row)}>
                <ApproveIcon />
              </div>
              &nbsp;&nbsp;
              <div onClick={() => rejectItem(row)}>
                <RejectIcon />
              </div>
            </div>
          )
        );
      },
    },
  ];

  return (
    <div className="payment-item-row">
      <Checkbox
        onChange={handleCheckPayment}
        checked={selectedPayment.includes(payment.code)}
        className={expanded ? "" : "opacity-0"}
      ></Checkbox>
      <div className={"payment-item-small " + (expanded ? "expanded" : "")}>
        <div className="row-content">
          <div className="left-content">
            <div className="payment-item-title w-full">
              <strong>Payment ID: #{payment.code}</strong>
              <span className="col-text">
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              </span>
              <strong>{payment.job.product.name}</strong>&nbsp;&nbsp;&nbsp;
              <QrCodeIcon />
            </div>
            <div className="payment-item-subtitle">
              <div
                className="total-order"
                onClick={() => setExpanded(!expanded)}
              >
                <strong>
                  {filterStatus
                    ? payment.orders.filter((x) => x.status === filterStatus)
                        .length
                    : payment.orders.length}{" "}
                  orders{" "}
                </strong>
                <OrderDropDown />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="">
                <span className="date-text">Date: </span>
                {moment(payment.createdAt).format("DD MMM, YYYY")}
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="payment-user">
                <Image
                  src={mediaUrl(payment.host.avatar)}
                  alt=""
                  width="24"
                  height="24"
                />
                &nbsp;&nbsp;
                <strong>{payment.host.name}</strong>
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="text-right">
              <span className="amount-text">${formatMoney(payment.total)}</span>
              <br />
              <div className={`payment-status payment-${payment.status}`}>
                {paymentStatus[payment.status]}
              </div>
            </div>
            {/* <div className="expanded-hide">
              <button className="primary-btn">
                Verify as <BtnDropDown />
              </button>
            </div> */}
            &nbsp;&nbsp;
            <div
              className={
                "attachment-icon " +
                (payment.proof && payment.proof.length > 0 ? "" : "opacity-0")
              }
            >
              <AttachmentIcon />
            </div>
            <Dropdown
              overlay={menu}
              trigger="click"
              overlayClassName="dropdown-order"
              placement="bottomCenter"
            >
              <div className="more-icon">
                <MoreIcon />
              </div>
            </Dropdown>
          </div>
        </div>
        {expanded && (
          <div className="row-table">
            <Table
              columns={columns}
              rowKey={(record) => record.code}
              dataSource={
                filterStatus
                  ? payment.orders.filter((x) => x.status === filterStatus)
                  : payment.orders
              }
              pagination={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
