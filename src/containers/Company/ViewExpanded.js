import React, { useEffect, useState } from "react";

import ApiAction from "@api/action";
import { Table } from "antd";
import moment from "moment";

export default function ViewExpanded({ companyCode }) {
  const [data, setData] = useState([]);
  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      title: "Code",
      dataIndex: "userCode",
      key: "userCode",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "user",
      render: (user) => {
        return user && user.email;
      }
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render: (text) => {
        return text ? "Yes" : "No";
      }
    },
    {
      title: "Created At",
      dataIndex: "user",
      key: "createdAt",
      render: (text, row) => {
        return text && moment(text.createdAt).format("DD-MM-YYYY");
      },
    },
  ];

  const getData = async () => {
    setIsLoading(true);
    const { result, data: dataResult } = await ApiAction.get(
      `admin/companies/${companyCode}/users?per_page=${limit}&page=${page}`
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
  }, [page, companyCode]);

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
