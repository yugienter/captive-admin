import "./style.css";

import { BtnDropDown, PaymentDetailIcon } from "./Icon";
import { Col, Dropdown, Menu, Row, Select, Tooltip, message } from "antd";
import {
  ComponentTitle,
  Label,
  PaymentWrapper,
  TableWrapperNotBorder,
  TitleWrapper,
} from "./View.styles";
import React, { useState } from "react";
import { formatMoney, objectToQueryString } from "../../library/helpers/format";
import { useDispatch, useSelector } from "react-redux";

import Box from "@iso/components/utility/box";
import CompanyPaymentRelease from "@iso/components/PaymentRelease/CompanyPaymentRelease";
import ContentHolder from "@iso/components/utility/contentHolder";
import HostPaymentRelease from "@iso/components/PaymentRelease/HostPaymentRelease";
import Image from "@iso/components/Image";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import LoadingScreen from "@iso/components/LoadingScreen";
import PopupConfirmOrder from "@iso/components/PaymentRelease/PopupConfirmOrder";
import SuperFetch from "../../api/action";
import dataActions from "@iso/redux/paymentJob/actions";
import { debounce } from "lodash";
import hostPaymentAction from "@iso/redux/hostPayment/actions";
import { jobStatus } from "@iso/config/jobStatus";
import { mediaUrl } from "@api/action";
import moment from "moment";
import { useHistory } from "react-router-dom";

const { loadData } = dataActions;

export default function View() {
  const [search, ] = useState("");
  const { data, page, limit, isLoading } = useSelector(
    (state) => state.PaymentJob
  );
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(false);
  const [showCompanyRelease, setShowCompanyRelease] = useState(false);
  const [showHostRelease, setShowHostRelease] = useState(false);
  const [confirmOrderPopup, setConfirmOrderPopup] = useState(false);
  const [campaignData, setCampaignData] = useState([]);
  const [hostData, setHostData] = useState([]);
  const [filterHost, setFilterHost] = useState("");
  const [filterJob, setFilterJob] = useState("");
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const [totalData, setTotalData] = useState({
    all: 0,
    ordering: 0,
    ended: 0,
    completed: 0,
  });
  const history = useHistory();

  const getData = () => {
    const filter = {
      page,
      limit,
      search,
      hostCode: filterHost,
      jobCode: filterJob,
      dealOrderStatus: filterStatus === "all" ? "" : filterStatus,
    };
    dispatch(loadData(filter));
  };

  const getTotal = async () => {
    const filter = {
      hostCode: filterHost,
      jobCode: filterJob,
    };
    const { result, data } = await SuperFetch.get(
      `admin/orders/job-list/count?${objectToQueryString(filter)}`
    );
    if (!result) return;
    setTotalData(data);
  };

  const handleReleaseToCompany = async (row) => {
    setSelectedDeal(row);
    setShowCompanyRelease(true);
  };

  const handleCompanyPaymentRelease = async () => {
    const dataBody = {
      jobName: getJobName(selectedDeal),
      jobCode: selectedDeal.jobCode,
      hostCode: selectedDeal.hostCode,
    };
    setIsLoadingScreen(true);
    const { result, data } = await SuperFetch.post(
      "admin/payments/release/company",
      dataBody
    );
    setIsLoadingScreen(false);
    if (result) {
      getData();
      setSelectedPayment(data.result);
      setConfirmOrderPopup(true);
      return;
    }
    message.error(data.message);
  };

  const onSubmitOrder = async () => {
    setShowHostRelease(false);
    setShowCompanyRelease(false);
    setConfirmOrderPopup(false);
    setSelectedPayment(false);
  };

  const closePopupConfirmOrder = async () => {
    setConfirmOrderPopup(false);
    setSelectedPayment(false);
  };

  const handleHostPaymentRelease = async () => {
    const dataBody = {
      jobName: getJobName(selectedDeal),
      jobCode: selectedDeal.jobCode,
      hostCode: selectedDeal.hostCode,
    };
    setIsLoadingScreen(true);
    const { result, data } = await SuperFetch.post(
      "admin/payments/release/host",
      dataBody
    );
    setIsLoadingScreen(false);
    if (result) {
      getData();
      setSelectedPayment(data.result);
      setConfirmOrderPopup(true);
      return;
    }
    message.error(data.message);
  };

  const handleReleaseToHost = async (row) => {
    setSelectedDeal(row);
    setShowHostRelease(true);
  };

  const menu = (row) => (
    <Menu>
      {!row?.releaseCompanyPaymentCode && (
        <Menu.Item onClick={() => handleReleaseToCompany(row)}>
          To Merchant
        </Menu.Item>
      )}
      {row?.streamHourlyRate?.description && !row?.releaseHostPaymentCode && (
        <Menu.Item onClick={() => handleReleaseToHost(row)}>
          To Seller
        </Menu.Item>
      )}
    </Menu>
  );

  const handleClickDetail = (row) => {
    dispatch(hostPaymentAction.updateHostData(row));
    history.push(`/dashboard/payment-job/${row.host.code}/${row.jobCode}`);
  };

  const handleTableChange = (pagination, filter, sorter) => {
    let sortType = null;
    if (sorter.order === "descend") sortType = "desc";
    if (sorter.order === "ascend") sortType = "asc";

    const params = {
      search,
      hostCode: filterHost,
      jobCode: filterJob,
      page: pagination.current,
      limit: pagination.pageSize,
      column: sorter.order ? sorter.columnKey : null,
      order: sortType,
    };
    dispatch(loadData(params));
  };

  const getJobName = (row) => {
    if (row?.job?.product?.name && row?.job?.campaign) {
      return `${row?.job?.product?.name} - ${row.job.campaign.name}`;
    }
    if (row?.job?.campaign) return row.job.campaign.name;
    return row?.job?.product?.name;
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

  const checkJobOrderStatus = (row) => {
    if (row.isCompleted) return "completed";
    if (!row?.streamTime?.description) return "";
    if (row.statusJob !== "execute") return "";
    const dealEndDate = moment(row.dealEndDate);
    if (moment().diff(dealEndDate) < 0) return "ordering";
    if (
      !row.isCompleted &&
      moment().diff(dealEndDate) >= 0 &&
      row.totalSubmitted === 0 &&
      !row.releaseCompanyPaymentCode &&
      !row.releaseHostPaymentCode
    )
      return "ready";
    if (
      moment().diff(dealEndDate) >= 0 &&
      row.totalSubmitted === 0 &&
      row.releaseCompanyPaymentCode &&
      row.releaseHostPaymentCode &&
      !row.isCompleted
    )
      return "verify";
    if (!row.releaseCompanyPaymentCode) return "ready";
    if (row?.streamHourlyRate?.description && !row.releaseHostPaymentCode)
      return "ready";
    return "ended";
  };

  const renderJobStatus = (row) => {
    const status = checkJobOrderStatus(row);
    if (!status) return "";
    return (
      <div className={`job-status job-${status}`}>
        {jobStatus[status]}&nbsp;
        {row.totalSubmitted > 0 && (
          <Tooltip title="Number of waiting approvals">
            <span className="number-count">{row.totalSubmitted ?? 0}</span>
          </Tooltip>
        )}
      </div>
    );
  };

  React.useEffect(() => {
    getCampaignData();
    getHostData();
    getTotal();
    // getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  React.useEffect(() => {
    if (!filterHost) return;
    getData();
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterHost]);

  React.useEffect(() => {
    if (!filterJob) return;
    getData();
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterJob]);

  React.useEffect(() => {
    if (!filterStatus) return;
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  const columns = [
    {
      title: "Seller",
      dataIndex: "host",
      key: "host",
      render: (text, row) => {
        return (
          <span>
            <Image
              src={mediaUrl(row.host.avatar)}
              alt=""
              className="circle-row-avatar"
              width="24"
              height="24"
            />
            &nbsp;&nbsp;
            <strong>{row.host.name}</strong>
          </span>
        );
      },
    },
    {
      title: "Product/Job Name",
      dataIndex: "jobName",
      key: "jobName",
      render: (text, row) => <strong>{getJobName(row)}</strong>,
    },
    {
      title: "Payment Status",
      dataIndex: "statusJob",
      key: "statusJob",
      render: (status, row) => renderJobStatus(row),
    },
    {
      title: "Order Submitted",
      dataIndex: "totalOrderSubmitted",
      align: "center",
      sorter: true,
      key: "totalOrderSubmitted",
      render: (text) => text ?? 0,
    },
    {
      title: "Order Paid",
      dataIndex: "totalAmountSubmitted",
      key: "totalAmountSubmitted",
      sorter: true,
      render: (total) => {
        return <strong>${formatMoney(total)}</strong>;
      },
    },
    {
      title: "Due Date",
      dataIndex: "streamTime",
      align: "center",
      sorter: true,
      key: "streamTime",
      render: (text, row) =>
      row.dealEndDate && (
          <div className={`job-status job-${row.statusJob}`}>
            {moment(row.dealEndDate).format("DD MMM, YYYY")}
          </div>
        ),
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
            <Dropdown
              overlay={menu(row)}
              trigger="click"
              overlayClassName="dropdown-order"
              placement="bottomCenter"
            >
              <button
                className={
                  "primary-btn " +
                  (checkJobOrderStatus(row) === "ready" &&
                  row.totalOrderSubmitted > 0 &&
                  (!row.releaseCompanyPaymentCode ||
                    !row.releaseHostPaymentCode)
                    ? ""
                    : "opacity-0")
                }
              >
                Release money <BtnDropDown />
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
              <ComponentTitle>Job Management</ComponentTitle>
            </TitleWrapper>
            <Row gutter={10}>
              <Col span={8}>
                <Label>
                  <strong>Job</strong>
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
            </Row>
            <br />
            <PaymentWrapper>
              <Row>
                <Col span={24}>
                  <ul className="filter-status">
                    <li
                      className={filterStatus === "all" ? "active" : ""}
                      onClick={() => setFilterStatus("all")}
                    >
                      All Statuses ({totalData.all})
                    </li>
                    <li
                      className={filterStatus === "ordering" ? "active" : ""}
                      onClick={() => setFilterStatus("ordering")}
                    >
                      Ordering ({totalData.ordering})
                    </li>
                    <li
                      className={filterStatus === "ended" ? "active" : ""}
                      onClick={() => setFilterStatus("ended")}
                    >
                      Ended ({totalData.ended})
                    </li>
                    <li
                      className={filterStatus === "completed" ? "active" : ""}
                      onClick={() => setFilterStatus("completed")}
                    >
                      Completed ({totalData.completed})
                    </li>
                  </ul>
                </Col>
                <br />
                <br />
                <Col span={24}>
                  <TableWrapperNotBorder
                    columns={columns}
                    bordered={false}
                    dataSource={data.data}
                    loading={isLoading}
                    className="isoSimpleTable"
                    rowKey={(record) => record.code}
                    onChange={handleTableChange}
                    pagination={{
                      hideOnSinglePage: true,
                      total: data.total,
                      page,
                      showTotal: (total, range) => {
                        return `Showing ${range[0]}-${range[1]} of ${data.total} Results`;
                      },
                    }}
                  />
                </Col>
              </Row>
            </PaymentWrapper>
          </ContentHolder>
          <CompanyPaymentRelease
            deal={selectedDeal}
            visible={showCompanyRelease}
            onContinue={handleCompanyPaymentRelease}
            handleClose={() => setShowCompanyRelease(false)}
          />
          <HostPaymentRelease
            deal={selectedDeal}
            visible={showHostRelease}
            onContinue={handleHostPaymentRelease}
            handleClose={() => setShowHostRelease(false)}
          />
          {selectedPayment && (
            <PopupConfirmOrder
              payment={selectedPayment}
              handleOK={onSubmitOrder}
              handleClose={closePopupConfirmOrder}
              visible={confirmOrderPopup}
            />
          )}
        </Box>
      </LayoutContentWrapper>
      {isLoadingScreen && <LoadingScreen />}
    </>
  );
}
