import "./style.css";

import {
  AmountDetailIcon,
  BackIcon,
  BtnApproveIcon,
  BtnDownloadIcon,
  BtnRejectIcon,
  SCXIcon,
  TotalDivider,
} from "./Icon";
import { Button, Checkbox, Col, Dropdown, Row, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import ApproveOrder from "@iso/components/PaymentAction/ApproveOrder";
import Box from "@iso/components/utility/box";
import ContentHolder from "@iso/components/utility/contentHolder";
import { DividerLine } from "../PaymentJob/Icon";
import DrawerPaymentDetail from "@iso/components/PaymentDetail/DrawerPaymentDetail";
import Image from "@iso/components/Image";
import InfiniteScroll from "react-infinite-scroll-component";
import Input from "@iso/components/uielements/input";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import PaymentItem from "./PaymentItem";
import { PaymentWrapper } from "./View.styles";
import RejectOrder from "@iso/components/PaymentAction/RejectOrder";
import TextArea from "antd/lib/input/TextArea";
import dataActions from "@iso/redux/payment/actions";
import { formatMoney } from "../../library/helpers/format";
import { hostPaymentStatistic } from "../../api/payment";
import { jobStatus } from "@iso/config/jobStatus";
import { mediaUrl } from "@api/action";
import moment from "moment";
import { orderStatus } from "../../config/orderStatus";
import { updateOrderStatus } from "../../api/order";

const {
  loadData,
  loadDataMore,
  approveItemsUpdate,
  rejectItemsUpdate,
  selectedOrderUpdate,
  selectedPaymentUpdate,
  changeStatusOrderItem,
  toggleModal,
} = dataActions;

export default function View() {
  const { hostCode, jobCode } = useParams();
  const [search, setSearch] = useState("");
  const { hostInfo } = useSelector((state) => state.HostPayment);
  const {
    data,
    page,
    limit,
    record,
    selectedApprove,
    selectedReject,
    selectedOrder,
  } = useSelector((state) => state.Payment);
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [checkAll, setCheckAll] = useState(false);
  const [countData, setCountData] = useState({
    totalAmount: 0,
    totalOrderSubmitted: 0,
    totalPlatformFee: 0,
    totalCommission: 0,
    commissionUnit: "%",
    streamCommission: 0,
    fixedRate: 0,
  });
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [orderTotalData, setOrderTotalData] = useState({
    all: 0,
    submitted: 0,
    approved: 0,
    rejected: 0,
    delivery: 0,
    completed: 0,
  });
  const history = useHistory();

  const getData = () => {
    const filter = {
      page,
      limit,
      search,
      status: "approved",
      hostCode,
      jobCode,
      type: "",
      source: "host",
    };
    dispatch(loadData(filter));
  };

  const loadMoreAction = () => {
    const filter = {
      page: page + 1,
      limit,
      search,
      status: "approved",
      hostCode,
      jobCode,
      type: "",
      source: "host",
    };
    dispatch(loadDataMore(filter));
  };

  const getCountData = async () => {
    const { result, data } = await hostPaymentStatistic(hostCode, jobCode);
    if (result) {
      setCountData(data);
    }
  };

  const handleApproveProduct = async () => {
    for (let i = 0; i < selectedApprove.length; i++) {
      const code = selectedApprove[i];
      const { result } = await updateOrderStatus(code, "approved", "");
      if (result) {
        dispatch(changeStatusOrderItem(code, "approved"));
        continue;
      }
    }
    message.success("Order change status success");
    if (selectedApprove.length > 1) {
      setCheckAll(false);
      dispatch(selectedOrderUpdate([]));
      dispatch(selectedPaymentUpdate([]));
    }
    dispatch(approveItemsUpdate([]));
    updateTotalAvailable();
  };

  const handleRejectProduct = async () => {
    for (let i = 0; i < selectedReject.length; i++) {
      const code = selectedReject[i];
      const { result } = await updateOrderStatus(
        code,
        "rejected",
        rejectReason
      );
      if (result) {
        dispatch(changeStatusOrderItem(code, "rejected"));
        continue;
      }
      message.error("Order change status error");
    }
    message.success("Order change status success");
    if (selectedReject.length > 1) {
      setCheckAll(false);
      dispatch(selectedOrderUpdate([]));
      dispatch(selectedPaymentUpdate([]));
    }
    dispatch(rejectItemsUpdate([]));
    updateTotalAvailable();
  };

  const handleCancelApprove = () => {
    dispatch(approveItemsUpdate([]));
  };

  const handleCancelReject = () => {
    dispatch(rejectItemsUpdate([]));
  };

  const approveSelectedOrder = () => {
    dispatch(approveItemsUpdate(selectedOrder));
  };

  const rejectSelectedOrder = () => {
    dispatch(rejectItemsUpdate(selectedOrder));
  };

  const downloadSelectedOrder = () => {
    let listOrders = [];
    data.data.forEach((item) => {
      const orders = item.orders
        .filter((order) => selectedOrder.includes(order.code))
        .map((order) => {
          return [
            `="${order.code}"`,
            order.sku,
            order.quantity,
            orderStatus[order.status],
            order.consumerName,
            order.contactNumber,
            order.deliveryAddress,
            moment(order.createdAt).format("DD/MM/YYYY"),
          ];
        });
      listOrders = [...listOrders, ...orders];
    });
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent +=
      "Order ID,SKU,Quantity,Status,Consumer Name,Contact Number,Delivery Address,Date\r\n";
    listOrders.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleCheckAll = (event) => {
    if (event.target.checked) {
      const listOrderCodes = data.data.map((item) =>
        item.orders
          .filter((order) => order.status === "submitted")
          .map((order) => order.code)
      );
      dispatch(selectedOrderUpdate(listOrderCodes.flat(1)));
      const listPaymentCodes = data.data.map((item) => item.code);
      dispatch(selectedPaymentUpdate(listPaymentCodes));
      setCheckAll(true);
      return;
    }
    setCheckAll(false);
    dispatch(selectedOrderUpdate([]));
    dispatch(selectedPaymentUpdate([]));
  };

  const updateTotalAvailable = () => {
    let total = 0;
    let totalData = {
      all: 0,
      submitted: 0,
      approved: 0,
      rejected: 0,
      delivery: 0,
      completed: 0,
    };
    data.data.forEach((item) => {
      total += item.orders.filter((x) => x.status === "submitted").length;
      totalData.all += item.orders.length;
      totalData.submitted += item.orders.filter(
        (x) => x.status === "submitted"
      ).length;
      totalData.approved += item.orders.filter(
        (x) => x.status === "approved"
      ).length;
      totalData.rejected += item.orders.filter(
        (x) => x.status === "rejected"
      ).length;
      totalData.delivery += item.orders.filter(
        (x) => x.status === "delivery"
      ).length;
      totalData.completed += item.orders.filter(
        (x) => x.status === "completed"
      ).length;
    });
    setTotalAvailable(total);
    setOrderTotalData(totalData);
  };

  const cancelViewPayment = () => {
    dispatch(toggleModal(false));
  };

  const backToPaymentJob = () => {
    history.push("/dashboard/payment-job");
  };

  const getJobName = (row) => {
    if (hostInfo?.job?.campaign) return hostInfo.job.campaign.name;
    return hostInfo?.product?.name;
  };

  const menu = () => (
    <div className="w-full">
      <div className="w-full inline-flex items-center justify-between cursor-pointer">
        <div>
          <span>Total Paid</span>
          <br />
          <h4 className="money-text">
            ${formatMoney(countData.totalAmount)}&nbsp;&nbsp;
            <AmountDetailIcon />
          </h4>
        </div>
        <div className="scx-icon">
          <SCXIcon />
        </div>
      </div>
      <div className="w-full">
        <DividerLine />
      </div>
      <div className="detail">
        <span>Commission</span>
        <br />
        <strong>${formatMoney(countData.totalCommission)}</strong>
        <br />
        <span>Fixed Rate</span>
        <br />
        <strong>${formatMoney(countData.fixedRate)}</strong>
        <br />
        <span>Platform Fee</span>
        <br />
        <strong>${formatMoney(countData.totalPlatformFee)}</strong>
        <br />
      </div>
    </div>
  );

  React.useEffect(() => {
    if (!hostInfo) {
      backToPaymentJob();
    }
    getData();
    getCountData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, hostInfo]);

  React.useEffect(() => {
    updateTotalAvailable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.data]);

  if (!hostInfo) {
    backToPaymentJob();
    return <div></div>;
  }

  return (
    <>
      <div className="header-host-info w-full inline-flex items-center justify-between">
        <div className="inline-flex">
          <div className="cursor-pointer" onClick={backToPaymentJob}>
            <br />
            <BackIcon />
            &nbsp;&nbsp;
          </div>
          <div className="host-info">
            <div className="w-full inline-flex items-center">
              <Image
                src={mediaUrl(hostInfo.host.avatar)}
                alt=""
                width="48"
                height="48"
              />
              &nbsp;&nbsp;
              <div>
                <h4 className="inline-flex items-center">
                  {hostInfo.host.name}&nbsp;&nbsp;&nbsp;&nbsp;
                  <div className={"job-status job-" + hostInfo.statusJob}>
                    {jobStatus[hostInfo.statusJob]}
                  </div>
                </h4>
                <div className="job-name">{getJobName()}</div>
              </div>
            </div>
            <div className="w-full inline-flex items-center">
              <div>
                Public RRP:{" "}
                <strong>${formatMoney(hostInfo.job.publicRRP)}</strong>
              </div>
              &nbsp;&nbsp; |&nbsp;&nbsp;
              <div>
                Due Date:{" "}
                <strong>
                  {moment(hostInfo?.streamTime?.description).format(
                    "DD MMM, YYYY"
                  )}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="total-info">
          <div id="total-info"></div>
          <div className="total-info-item inline-flex items-center">
            <div>
              <span>Submitted Orders</span>
              <br />
              <h4>{countData.totalOrderSubmitted}</h4>
            </div>
            <div className="divider-total">
              <TotalDivider />
            </div>
            <Dropdown
              overlay={menu}
              trigger="click"
              overlayClassName="dropdown-total"
              placement="bottomCenter"
              align={{
                offset: [0, -60],
              }}
            >
              <div className="inline-flex items-center justify-between cursor-pointer">
                <div>
                  <span>Total Paid</span>
                  <br />
                  <h4 className="money-text">
                    ${formatMoney(countData.totalAmount)}&nbsp;&nbsp;
                    <AmountDetailIcon />
                  </h4>
                </div>
                <div className="scx-icon">
                  <SCXIcon />
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
      <LayoutContentWrapper>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <ContentHolder style={{ marginTop: 0, overflow: "hidden" }}>
            <Row>
              <Col md={4}>
                <Input
                  label="Search"
                  placeholder="Search text..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              &nbsp;&nbsp;
              <Col>
                <Button onClick={() => getData()} type="primary">
                  Search
                </Button>
              </Col>
            </Row>
            <br />
            <PaymentWrapper>
              <Row>
                <Col span={24}>
                  <ul className="filter-status">
                    <li
                      className={filterStatus === "" ? "active" : ""}
                      onClick={() => setFilterStatus("")}
                    >
                      All Status ({orderTotalData.all})
                    </li>
                    <li
                      className={filterStatus === "submitted" ? "active" : ""}
                      onClick={() => setFilterStatus("submitted")}
                    >
                      Awaiting Approval ({orderTotalData.submitted})
                    </li>
                    <li
                      className={filterStatus === "approved" ? "active" : ""}
                      onClick={() => setFilterStatus("approved")}
                    >
                      Approved ({orderTotalData.approved})
                    </li>
                    <li
                      className={filterStatus === "rejected" ? "active" : ""}
                      onClick={() => setFilterStatus("rejected")}
                    >
                      Rejected ({orderTotalData.rejected})
                    </li>
                    <li
                      className={filterStatus === "delivery" ? "active" : ""}
                      onClick={() => setFilterStatus("delivery")}
                    >
                      On Delivery ({orderTotalData.delivery})
                    </li>
                    <li
                      className={filterStatus === "completed" ? "active" : ""}
                      onClick={() => setFilterStatus("completed")}
                    >
                      Completed ({orderTotalData.completed})
                    </li>
                  </ul>
                </Col>
                <br />
                <br />
                <Col span={24}>
                  <div className="list-payment-item">
                    <InfiniteScroll
                      dataLength={data.data.length}
                      next={loadMoreAction}
                      hasMore={data.data.length < data.total}
                      scrollableTarget="scrollableDiv"
                    >
                      {data.data.map((item) => (
                        <PaymentItem
                          filterStatus={filterStatus}
                          key={item.code}
                          payment={item}
                        />
                      ))}
                    </InfiniteScroll>
                  </div>
                </Col>
              </Row>
            </PaymentWrapper>
          </ContentHolder>
          <ApproveOrder
            visible={selectedApprove.length > 0}
            handleOk={handleApproveProduct}
            handleClose={handleCancelApprove}
          >
            {selectedApprove.length > 1 ? (
              <>
                <h4>Approve Confirmation</h4>
                <p>
                  Are you sure you want to approve{" "}
                  <strong>{selectedApprove.length}</strong>&nbsp; selected
                  orders?
                  <br />
                  You can’t undo this action.
                </p>
              </>
            ) : (
              <p>Are you sure you want to approve selected order?</p>
            )}
            <br />
          </ApproveOrder>
          <RejectOrder
            visible={selectedReject.length > 0}
            handleOk={handleRejectProduct}
            handleClose={handleCancelReject}
          >
            {selectedReject.length > 1 ? (
              <>
                <h4>Reject Confirmation</h4>
                <p>
                  Please provide your rejection cause for&nbsp;
                  <strong>{selectedReject.length}</strong>&nbsp;selected orders.
                  <br />
                  (For individual cause, please use inline reject)
                </p>
              </>
            ) : (
              <p>Provide your rejection cause.</p>
            )}
            <TextArea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="text-reject"
              placeholder="e.g. Missing Consumer full name"
            />
          </RejectOrder>
        </Box>
      </LayoutContentWrapper>
      <DrawerPaymentDetail
        payment={record}
        visible={record}
        handleClose={cancelViewPayment}
      />
      <div className="footer-bar-action">
        <Row style={{ width: "100%", padding: "10px 30px" }}>
          <Col span={10}>
            <Checkbox checked={checkAll} onChange={handleCheckAll}>
              Select all available ({totalAvailable})
            </Checkbox>
          </Col>
          <Col span={14} style={{ textAlign: "right" }}>
            <Button
              onClick={downloadSelectedOrder}
              className={
                "btn-normal " + (selectedOrder.length === 0 ? "hide-btn" : "")
              }
            >
              <BtnDownloadIcon />
              &nbsp;&nbsp; Download XLS ({selectedOrder.length})
            </Button>
            <Button
              onClick={approveSelectedOrder}
              className={
                "btn-approve " + (selectedOrder.length === 0 ? "hide-btn" : "")
              }
            >
              <BtnApproveIcon />
              &nbsp;&nbsp; Approve Selected ({selectedOrder.length})
            </Button>
            <Button
              onClick={rejectSelectedOrder}
              className={
                "btn-reject " + (selectedOrder.length === 0 ? "hide-btn" : "")
              }
            >
              <BtnRejectIcon />
              &nbsp;&nbsp; Reject Selected ({selectedOrder.length})
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}
