import "./style.css";

import {
  BtnApproveIcon,
  BtnRejectIcon,
  SortDropdownIcon,
  SortLatestIcon,
  SortOldestIcon,
} from "./Icon";
import {
  Button,
  Checkbox,
  Col,
  Dropdown,
  Menu,
  Row,
  Select,
  message,
} from "antd";
import {
  ComponentTitle,
  Label,
  PaymentWrapper,
  TitleWrapper,
} from "./View.styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApproveOrder from "@iso/components/PaymentAction/ApproveOrder";
import Box from "@iso/components/utility/box";
import { BtnDownloadIcon } from "../HostPayment/Icon";
import ContentHolder from "@iso/components/utility/contentHolder";
import DrawerPaymentDetail from "@iso/components/PaymentDetail/DrawerPaymentDetail";
import InfiniteScroll from "react-infinite-scroll-component";
import Input from "@iso/components/uielements/input";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import PaymentItem from "./PaymentItem";
import RejectOrder from "@iso/components/PaymentAction/RejectOrder";
import SuperFetch from "../../api/action";
import TextArea from "antd/lib/input/TextArea";
import dataActions from "@iso/redux/payment/actions";
import { debounce } from "lodash";
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
  const [search, setSearch] = useState("");
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
  const [campaignData, setCampaignData] = useState([]);
  const [hostData, setHostData] = useState([]);
  const [filterHost, setFilterHost] = useState("");
  const [filterJob, setFilterJob] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [checkAll, setCheckAll] = useState(false);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [sortType, setSortType] = useState("desc");

  const getData = () => {
    const filter = {
      page,
      limit,
      search,
      status: "approved",
      hostCode: filterHost,
      jobCode: filterJob,
      type: "approved",
      column: "createdAt",
      order: sortType,
    };
    dispatch(loadData(filter));
  };

  const loadMoreAction = () => {
    const filter = {
      page: page + 1,
      limit,
      search,
      status: "approved",
      hostCode: filterHost,
      jobCode: filterJob,
      type: "approved",
      column: "createdAt",
      order: sortType,
    };
    dispatch(loadDataMore(filter));
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
    setCheckAll(false);
    dispatch(selectedOrderUpdate([]));
    dispatch(selectedPaymentUpdate([]));
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
    setCheckAll(false);
    dispatch(selectedOrderUpdate([]));
    dispatch(selectedPaymentUpdate([]));
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

  const getCampaignData = async (search = "") => {
    const { result, data } = await SuperFetch.get(
      `admin/campaigns?page=1&per_page=10&search=${search}`
    );
    if (result) {
      setCampaignData(data.data);
    }
  };

  const getHostData = async (search = "") => {
    const { result, data } = await SuperFetch.get(
      `admin/hosts?page=1&per_page=10&search=${search}`
    );
    if (result) {
      setHostData(data.data);
    }
  };

  const handleSearchCampaign = (value) => {
    getCampaignData(value);
  };

  const handleSearchHost = (value) => {
    getHostData(value);
  };

  const updateTotalAvailable = () => {
    let total = 0;
    data.data.forEach((item) => {
      total += item.orders.filter((x) => x.status === "submitted").length;
    });
    setTotalAvailable(total);
  };

  const cancelViewPayment = () => {
    dispatch(toggleModal(false));
  };

  const menuSort = () => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          className="w-full inline-flex items-center"
          onClick={() => setSortType("desc")}
        >
          <SortLatestIcon />
          &nbsp;&nbsp;
          <span>Newest</span>
        </Menu.Item>
        <br />
        <Menu.Item
          key="2"
          className="w-full inline-flex items-center"
          onClick={() => setSortType("asc")}
        >
          <SortOldestIcon />
          &nbsp;&nbsp;
          <span>Oldest</span>
        </Menu.Item>
      </Menu>
    );
  };

  React.useEffect(() => {
    if (selectedOrder.length > 0 && selectedOrder.length === totalAvailable) {
      setCheckAll(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrder]);

  React.useEffect(() => {
    getCampaignData();
    getHostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  React.useEffect(() => {
    updateTotalAvailable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.data]);

  React.useEffect(() => {
    if (!filterHost) return;
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterHost]);

  React.useEffect(() => {
    if (!filterJob) return;
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterJob]);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  return (
    <>
      <LayoutContentWrapper>
        <Box>
          <ContentHolder style={{ marginTop: 0, overflow: "hidden" }}>
            <TitleWrapper>
              <ComponentTitle>Order Management</ComponentTitle>
            </TitleWrapper>
            <Row gutter={[16, 15]}>
              <Col span={8}>
                <Label>
                  <strong>Payment code</strong>
                </Label>
                <Input
                  label="Search"
                  placeholder="Search text..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              &nbsp;&nbsp;
              <Col span={10}>
                <Label>
                  &nbsp;
                  <br />
                </Label>
                <Button onClick={() => getData()} type="primary">
                  Search
                </Button>
              </Col>
              <Col span={8}>
                <Label>
                  <strong>Campaign</strong>
                </Label>
                <Select
                  allowClear={true}
                  onClear={() => setFilterJob("")}
                  filterOption={false}
                  showSearch={true}
                  className="w-full"
                  onSearch={debounce(handleSearchCampaign, 800)}
                  value={filterJob}
                  onChange={setFilterJob}
                >
                  {campaignData.map((item, index) => (
                    <Select.Option key={index} value={item.code}>
                      {item.campaign.name} - {item.product.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col span={8}>
                <Label>
                  <strong>Host</strong>
                </Label>
                <Select
                  allowClear={true}
                  onClear={() => setFilterHost("")}
                  filterOption={false}
                  showSearch={true}
                  className="w-full"
                  onSearch={debounce(handleSearchHost, 800)}
                  value={filterHost}
                  onChange={setFilterHost}
                >
                  {hostData.map((item, index) => (
                    <Select.Option key={index} value={item.code}>
                      {item.email} - {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col span={8} style={{ textAlign: "right" }}>
                <Dropdown
                  overlay={menuSort}
                  trigger="click"
                  placement="bottomCenter"
                >
                  <div className="sort-btn inline-flex items-center">
                    {sortType === "desc" ? (
                      <SortLatestIcon />
                    ) : (
                      <SortOldestIcon />
                    )}
                    &nbsp;&nbsp;Sort:&nbsp;
                    <strong>{sortType === "desc" ? "Newest" : "Oldest"}</strong>
                    &nbsp;&nbsp;
                    <SortDropdownIcon />
                  </div>
                </Dropdown>
              </Col>
            </Row>
            <br />
            <PaymentWrapper>
              <div className="list-payment-item">
                <InfiniteScroll
                  dataLength={data.data.length}
                  next={loadMoreAction}
                  hasMore={data.data.length < data.total}
                  scrollableTarget="scrollableDiv"
                >
                  {data.data.map((item) => (
                    <PaymentItem key={item.code} payment={item} />
                  ))}
                </InfiniteScroll>
              </div>
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
              Select all available ({totalAvailable - selectedOrder.length})
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
