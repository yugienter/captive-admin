import React, { useState, useEffect } from "react";
import { Table } from "antd";
import ApiAction from "@api/action";
import moment from "moment";

export default function ViewExpanded({ jobCode }) {
  const [data, setData] = useState([]);
  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const JobStatusText = {
    offer: "Direct Offer",
    submitted: "Bid Submitted",
    negotiating: "Negotiating",
    execute: "Waiting to execute",
    complete: "Completed",
    rejected: "Rejected",
    verify: "Completed",
  };

  const columns = [
    {
      title: "Host",
      dataIndex: "host",
      key: "host",
      render: (text, row) => {
        return (
          text && (
            <div>
              Name: {text.name}
              <br />
              Email: {text.email}
              <br />
              Phone: {text.phoneNumber}
            </div>
          )
        );
      },
    },
    // {
    //   title: "Status",
    //   key: "status",
    //   dataIndex: "status",
    //   render: (text, row) => {
    //     return statusDeal[text] || text;
    //   }
    // },
    {
      title: "Status",
      key: "statusJob",
      dataIndex: "statusJob",
      render: (text, row) => {
        return JobStatusText[text] || text;
      }
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Stream Type",
      dataIndex: "streamType",
      key: "streamType",
      render: (text, row) => {
        return text?.description ?? "";
      },
    },
    {
      title: "Stream Time",
      dataIndex: "streamTime",
      key: "streamTime",
      render: (text, row) => {
        return text?.description
          ? moment(text?.description).format("DD-MM-YYYY")
          : "";
      },
    },
    {
      title: "Elements",
      dataIndex: "streamElement",
      key: "streamElement",
      render: (text, row) => {
        return text?.description?.map((element, index) => {
          return index > 0 ? ` + ${element}` : element;
        });
      },
    },
    {
      title: "Platform",
      dataIndex: "streamPlatform",
      key: "streamPlatform",
      render: (text, row) => {
        return text?.description?.map((element, index) => {
          return index > 0 ? ` + ${element}` : element;
        });
      },
    },
    {
      title: "Agreed Pricing",
      dataIndex: "streamPricings",
      key: "streamPricings",
      render: (text, row) => {
        return (
          <div>
            {text}
            <br />
            Hourly Rate: {row?.streamHourlyRate?.description}
            <br />
            Hourly Rate Range:{" "}
            {(row?.streamHourlyRateRange?.start ?? "") +
              " - " +
              (text?.streamHourlyRateRange?.end ?? "") +
              " " +
              (text?.streamHourlyRateRange?.unit ?? "")}
          </div>
        );
      },
    },
    {
      title: "Stream Commission",
      dataIndex: "streamCommission",
      key: "streamCommission",
      render: (text, row) => {
        return text?.description + " " + row?.streamCommissionUnit;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, row) => {
        return moment(text).format("DD-MM-YYYY");
      },
    },
  ];

  const getData = async () => {
    setIsLoading(true);
    const { result, data: dataResult } = await ApiAction.get(
      `admin/direct-offers/${jobCode}/deals?per_page=${limit}&page=${page}`
    );
    setIsLoading(false);
    if (result) {
      setData(dataResult.data);
      setTotal(dataResult.total);
      return;
    }
    setData([]);
    setTotal(0);
  };

  const handleChange = (pagination, filters, sorter) => {
    const page = pagination.current;
    setPage(page);
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, jobCode]);

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      onChange={handleChange}
      pagination={{
        total,
      }}
    />
  );
}
