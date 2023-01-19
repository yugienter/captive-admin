import _ from "lodash";
import "./style.css";

import {
  BtnDateIcon,
  BtnDropDown,
  BtnExcelIcon,
  HadAttachmentIcon,
  PaymentDetailIcon,
  PaymentInIcon,
  PaymentOutIcon,
} from "./Icon";
import { Col, Dropdown, Menu, Row, message, DatePicker, Button } from "antd";
import {
  ComponentTitle,
  Label,
  PaymentWrapper,
  TitleWrapper,
} from "./View.styles";
import React, { useState } from "react";
import {
  paymentCodePrefix,
  paymentTypeText,
  updatePaymentStatus,
} from "@api/payment";
import { useDispatch, useSelector } from "react-redux";

import Box from "@iso/components/utility/box";
import ContentHolder from "@iso/components/utility/contentHolder";
import DrawerPaymentDetail from "@iso/components/PaymentDetail/DrawerPaymentDetail";
import Image from "@iso/components/Image";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import { TableWrapperNotBorder } from "../PaymentJob/View.styles";
import dataActions from "@iso/redux/payment/actions";
import { formatMoney, objectToQueryString } from "../../library/helpers/format";
import { mediaUrl } from "@api/action";
import moment from "moment";
import { paginationData } from "../../api/action";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const { RangePicker } = DatePicker;
const { loadData, changeStatusItem, loadCountData, setSelectedPayment } =
  dataActions;

export default function View() {
  const [search] = useState("");
  const {
    data,
    page,
    limit,
    isLoading,
    count,
    selectedPaymentDetail: selectedPayment,
  } = useSelector((state) => state.Payment);
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState("");
  const [filterReceive, setFilterReceive] = useState("");
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [dates, setDates] = useState(null);
  const [hackValue, setHackValue] = useState(null);
  const [value, setValue] = useState(null);

  const paymentStatus = {
    submitted: "Pending Payment",
    approved: "Paid",
    verify: "Verifying Payment",
    rejected: "Canceled",
  };

  const onChangeDateRange = (value) => {
    setValue(value);
    if (value && value.length > 1) {
      setStartDate(value[0]);
      setEndDate(value[1]);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const disabledDate = (current) => {
    if (current > moment()) {
      return true;
    }
    if (!dates) {
      return false;
    }
    const tooLate =
      dates[0] && current.isAfter(dates[0].clone().add(1, "month"));
    const tooEarly =
      dates[1] && dates[1].isAfter(current.clone().add(1, "month"));
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([null, null]);
      setDates([null, null]);
    } else {
      setHackValue(null);
    }
  };

  const getData = (changePage = false, receive = false, status = false) => {
    const filter = {
      page: changePage ?? page,
      limit,
      search,
      status: status !== false ? status : filterStatus,
      receive: receive !== false ? receive : filterReceive,
      jobCode: "",
      hostCode: "",
    };
    dispatch(loadData(filter));
  };

  const getDataExport = async (page = 1) => {
    const filter = {
      page,
      limit,
      search,
      status: filterStatus,
      receive: filterReceive,
      jobCode: "",
      hostCode: "",
    };
    if (startDate) {
      filter.fromDate = startDate.format("YYYY-MM-DD 00:00:00");
    }
    if (endDate) {
      filter.toDate = endDate.format("YYYY-MM-DD 23:59:59");
    }
    const customQuery = `&${objectToQueryString(filter)}`;
    const { data } = await paginationData(
      "admin/payments",
      page,
      limit,
      search,
      "",
      "",
      customQuery
    );
    return data;
  };

  const exportPayment = async () => {
    const data = await getDataExport(1);
    const total = data.total;
    let result = data.data;
    const totalPage = Math.round(total / limit);
    for (let i = 1; i < totalPage; i++) {
      const data = await getDataExport(i + 1);
      result = [...result, ...data.data];
    }

    const { orders, payments } = prepareDataToExport(result);
    exportXls(orders, "Payment_Orders_Details");
    exportXls(payments, "Payment");
    // const exportData = result.map((item) => {
    //   return {
    //     "Payment ID": `${paymentCodePrefix(item)}${item.code}`,
    //     Type: paymentTypeText(item),
    //     "Sender/Receiver": getSenderName(item),
    //     "Product/Job Name": item.jobName,
    //     "Payment Status": paymentStatus[item.status],
    //     Amount: (item.receive === "scx" ? "+" : "-") + item.total,
    //     Date: moment(item.createdAt).format("DD-MM-YYYY"),
    //   };
    // });
    // const fileType =
    //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    // const fileExtension = ".xlsx";
    // const ws = XLSX.utils.json_to_sheet(exportData);
    // var wscols = [
    //   { wpx: 150 },
    //   { wpx: 150 },
    //   { wpx: 150 },
    //   { wpx: 150 },
    //   { wpx: 150 },
    //   { wpx: 150 },
    //   { wpx: 150 },
    // ];
    // ws["!cols"] = wscols;
    // const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    // const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    // const fileData = new Blob([excelBuffer], { type: fileType });
    // const fileName = `Payment_${moment().format("DD-MM-YYYY")}${fileExtension}`;
    // FileSaver.saveAs(fileData, fileName);
  };

  const exportXls = (data, filePrefix) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(data);
    var wscols = _.keys(data[0]).map(key => ({ wpx: 150 }));

    ws["!cols"] = wscols;
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: fileType });
    const fileName = `${filePrefix}_${moment().format("DD-MM-YYYY")}${fileExtension}`;
    console.log(fileName, data, fileData)
    FileSaver.saveAs(fileData, fileName);
  }

  const prepareDataToExport = (data) => {
    const orders = [];
    const payments = data.map((paymentItem) => {
      // parse order details 
      const paymentOrders = _.get(paymentItem, "orders", []);
      paymentOrders.map(orderItem => {
        if (_.has(orderItem, "deliveryInfo") && _.has(orderItem, "orderDetails")) {
          const paymentOrderDetails = _.get(orderItem, "orderDetails", []);
          paymentOrderDetails.map(orderDetailItem => {
            const orderDetailInfo = {
              "Payment ID": `${paymentCodePrefix(paymentItem)}${paymentItem.code}`,
              "Payment Type": paymentTypeText(paymentItem),

              "Product Code": orderDetailItem.productCode,
              "Product Name": orderDetailItem.name,
              "Product Price": orderDetailItem.price + orderDetailItem.unit,
              "Discount": orderDetailItem.discount + orderDetailItem.discountUnit,
              "Quantity": orderDetailItem.quantity,
              "Bronze Tier": orderDetailItem.tiers.bronze.value + orderDetailItem.tiers.bronze.unit,
              "Silver Tier": orderDetailItem.tiers.silver.value + orderDetailItem.tiers.silver.unit,
              "Gold Tier": orderDetailItem.tiers.gold.value + orderDetailItem.tiers.gold.unit,
              "Status": orderDetailItem.status,
              "Order Date": moment(orderItem.createdAt).format("DD-MM-YYYY"),

              "Delivery Name": orderItem.deliveryInfo.name,
              "Delivery Phone Number": orderItem.deliveryInfo.phoneNumber,
              "Delivery Address 1": orderItem.deliveryInfo.address1,
              "Delivery Address 2": orderItem.deliveryInfo.address2,
              "Delivery Delivery Date": moment(orderItem.deliveryInfo.deliveryDate).format("DD-MM-YYYY"),
              "Delivery Delivery Time": moment(orderItem.deliveryInfo.deliveryTime).format("HH:mm"),

              "Campaign Name": _.get(paymentItem, "campaign.campaign.name"),

              "Host Name": paymentItem.host.name,
              "Host Email": paymentItem.host.email,

              "Company Name": paymentItem.company.name,
              "Company Email": paymentItem.company.email,


              "Sender/Receiver": getSenderName(paymentItem),
              "Product/Job Name": paymentItem.jobName,
              "Payment Status": paymentStatus[paymentItem.status],
              "Payment Date": moment(paymentItem.createdAt).format("DD-MM-YYYY"),
            };

            orders.push(orderDetailInfo);
          });
        }
      })

      // default payment data 
      return {
        "Payment ID": `${paymentCodePrefix(paymentItem)}${paymentItem.code}`,
        Type: paymentTypeText(paymentItem),
        "Sender/Receiver": getSenderName(paymentItem),
        "Product/Job Name": paymentItem.jobName,
        "Payment Status": paymentStatus[paymentItem.status],
        Amount: (paymentItem.receive === "scx" ? "+" : "-") + paymentItem.total,
        Date: moment(paymentItem.createdAt).format("DD-MM-YYYY"),
      };
    });
    return { payments, orders };
  }

  const paidPayment = async (code) => {
    const { result } = await updatePaymentStatus(code, "approved");
    if (result) {
      dispatch(changeStatusItem(code, "approved"));
      dispatch(loadCountData());
      message.success("Payment change status success");
      return;
    }
    message.error("Payment change status error");
  };

  const menu = (code) => (
    <Menu>
      <Menu.Item onClick={() => paidPayment(code)}>Paid</Menu.Item>
    </Menu>
  );

  const handleClickDetail = (row) => {
    dispatch(setSelectedPayment(row));
  };

  const handleTableChange = (pagination, filter, sorter) => {
    let sortType = null;
    if (sorter.order === "descend") sortType = "desc";
    if (sorter.order === "ascend") sortType = "asc";

    const params = {
      search: "",
      page: pagination.current,
      limit: pagination.pageSize,
      column: sorter.order ? sorter.columnKey : null,
      order: sortType,
      status: filterStatus,
      jobCode: "",
      hostCode: "",
    };
    dispatch(loadData(params));
  };

  const getSenderName = (row) => {
    if (
      row.source === "host" ||
      (row.source === "scx" && row.receive === "host")
    ) {
      return row.host.name;
    }
    if (
      row.source === "company" ||
      (row.source === "scx" && row.receive === "company")
    ) {
      return row?.company?.name;
    }
  };

  const getSender = (row) => {
    if (
      row.source === "host" ||
      (row.source === "scx" && row.receive === "host")
    ) {
      return (
        <div className="inline-flex justify-center">
          <Image
            src={mediaUrl(row.host.avatar)}
            alt=""
            className="circle-row-avatar"
            width="24"
            height="24"
          />
          &nbsp;&nbsp;
          <strong>{row.host.name}</strong>
        </div>
      );
    }
    if (
      row.source === "company" ||
      (row.source === "scx" && row.receive === "company")
    ) {
      return (
        <div className="inline-flex justify-center">
          <Image
            src={mediaUrl(row?.company?.logo)}
            alt=""
            className="circle-row-avatar"
            width="24"
            height="24"
          />
          &nbsp;&nbsp;
          <strong>{row?.company?.name}</strong>
        </div>
      );
    }
  };

  const changeFilterStatus = (value) => {
    setFilterStatus(value);
    getData(1, "", value);
  };

  const changeFilterReceive = (value) => {
    setFilterReceive(value);
    getData(1, value);
  };

  const callLoadCountData = () => {
    dispatch(loadCountData());
  };

  const refreshData = () => {
    getData();
  };

  React.useEffect(() => {
    getData();
    callLoadCountData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "code",
      align: "center",
      key: "code",
      sorter: true,
      render: (code, row) => (
        <div className="inline-flex items-center">
          {row.receive === "scx" ? <PaymentInIcon /> : <PaymentOutIcon />}
          &nbsp;&nbsp;
          <strong>
            {paymentCodePrefix(row)}
            {code}
          </strong>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "receive",
      align: "center",
      key: "receive",
      sorter: true,
      render: (code, row) => <strong>{paymentTypeText(row)}</strong>,
    },
    {
      title: "Sender/Receiver",
      dataIndex: "host",
      key: "host",
      sorter: true,
      render: (text, row) => {
        return getSender(row);
      },
    },
    {
      title: "Product/Job Name",
      dataIndex: "jobName",
      key: "jobName",
    },
    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (status) => (
        <div className={`payment-status payment-${status}`}>
          {paymentStatus[status]}
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "total",
      key: "total",
      align: "right",
      sorter: true,
      render: (total, row) => {
        return (
          <strong
            className={row.receive === "scx" ? "payment-in" : "payment-out"}
          >
            {row.receive === "scx" ? "+" : "-"}${formatMoney(total)}
          </strong>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      align: "center",
      sorter: true,
      key: "createdAt",
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
          <div className="action-row">
            <div onClick={() => handleClickDetail(row)}>
              <PaymentDetailIcon />
            </div>
            <div
              className={row.proof && row.proof.length > 0 ? "" : "opacity-0"}
            >
              <HadAttachmentIcon />
            </div>
            <Dropdown
              overlay={menu(row.code)}
              trigger="click"
              overlayClassName="dropdown-order"
              placement="bottomCenter"
            >
              <button
                className={
                  "primary-btn " +
                  (row.status !== "submitted" || row.receive !== "scx"
                    ? "opacity-0"
                    : "")
                }
              >
                Verify as <BtnDropDown />
              </button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <LayoutContentWrapper>
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <ContentHolder style={{ marginTop: 0, overflow: "hidden" }}>
            <TitleWrapper>
              <ComponentTitle>Payment Management</ComponentTitle>
            </TitleWrapper>
            {/* <Row>
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
            <br /> */}
            <PaymentWrapper>
              <Row>
                <Col span={24}>
                  <Label>Type: </Label>
                  <ul className="filter-status">
                    <li
                      className={filterReceive === "" ? "active" : ""}
                      onClick={() => changeFilterReceive("")}
                    >
                      All
                    </li>
                    <li
                      className={filterReceive === "scx" ? "active" : ""}
                      onClick={() => changeFilterReceive("scx")}
                    >
                      Payment In
                    </li>
                    <li
                      className={filterReceive === "user" ? "active" : ""}
                      onClick={() => changeFilterReceive("user")}
                    >
                      Payment Out
                    </li>
                  </ul>
                </Col>
                <br />
                <br />
                <Col span={12}>
                  <Label>Status: </Label>
                  <ul className="filter-status">
                    <li
                      className={filterStatus === "" ? "active" : ""}
                      onClick={() => changeFilterStatus("")}
                    >
                      All Transactions ({count?.all ?? 0})
                    </li>
                    <li
                      className={filterStatus === "submitted" ? "active" : ""}
                      onClick={() => changeFilterStatus("submitted")}
                    >
                      Pending Payment ({count?.submitted ?? 0})
                    </li>
                    <li
                      className={filterStatus === "verify" ? "active" : ""}
                      onClick={() => changeFilterStatus("verify")}
                    >
                      Verifying Payment ({count?.verify ?? 0})
                    </li>
                    <li
                      className={filterStatus === "approved" ? "active" : ""}
                      onClick={() => changeFilterStatus("approved")}
                    >
                      Paid ({count?.approved ?? 0})
                    </li>
                    <li
                      className={filterStatus === "rejected" ? "active" : ""}
                      onClick={() => changeFilterStatus("rejected")}
                    >
                      Canceled ({count?.rejected ?? 0})
                    </li>
                  </ul>
                </Col>
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <Label style={{ marginBottom: -5 }}>Date: &nbsp;&nbsp;</Label>
                  <div className="date-range-export">
                    <div className="icon">
                      <BtnDateIcon />
                    </div>
                    <div className="date-input">
                      <RangePicker
                        suffixIcon={false}
                        bordered={false}
                        value={hackValue || value}
                        disabledDate={disabledDate}
                        onCalendarChange={(val) => setDates(val)}
                        onChange={onChangeDateRange}
                        onOpenChange={onOpenChange}
                      />
                    </div>
                  </div>
                  &nbsp;&nbsp;
                  <Button onClick={exportPayment} className="btn-export-xls">
                    <BtnExcelIcon />
                    &nbsp;&nbsp; Export to XLS
                  </Button>
                </Col>
                <Col span={24} style={{ marginTop: "30px" }}>
                  <TableWrapperNotBorder
                    columns={columns}
                    bordered={false}
                    dataSource={data.data}
                    loading={isLoading}
                    className="isoSimpleTable"
                    rowKey="code"
                    onChange={handleTableChange}
                    pagination={{
                      hideOnSinglePage: true,
                      total: data.total,
                      showTotal: (total, range) => {
                        return `Showing ${range[0]}-${range[1]} of ${data.total} Results`;
                      },
                    }}
                  />
                </Col>
              </Row>
            </PaymentWrapper>
          </ContentHolder>
          <DrawerPaymentDetail
            payment={selectedPayment}
            visible={selectedPayment}
            refreshData={refreshData}
            handleClose={() => dispatch(setSelectedPayment(false))}
          />
        </Box>
      </LayoutContentWrapper>
    </>
  );
}
