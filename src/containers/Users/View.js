import { Col, Row, DatePicker, Button } from "antd";
import { ComponentTitle, PaymentWrapper, TitleWrapper } from "./View.styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@iso/components/utility/box";
import ContentHolder from "@iso/components/utility/contentHolder";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import { TableWrapperNotBorder } from "../PaymentJob/View.styles";
import dataActions from "@iso/redux/users/actions";

const { RangePicker } = DatePicker;
const { loadData, verifyUserEmail } = dataActions;

export default function View() {
  const [search] = useState("");
  const { data, page, limit, isLoading, sorter } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  const getData = (changePage = false) => {
    const filter = {
      page: changePage ?? page,
      limit,
      search,
    };
    dispatch(loadData(filter));
  };

  const reloadData = () => {
    const params = {
      search: "",
      page,
      limit,
      column: sorter.order ? sorter.columnKey : null,
      order: sorter.order,
    };
    dispatch(loadData(params));
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
    };
    dispatch(loadData(params));
  };

  const handleVerifyEmail = async (user) => {
    await dispatch(verifyUserEmail(user.code));
    reloadData();
  };

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "a",
      key: "",
      render: (_, row) => {
        return !row.verified ? (
          <Button onClick={() => handleVerifyEmail(row)}>Verify Email</Button>
        ) : (
          ""
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
              <ComponentTitle>Users</ComponentTitle>
            </TitleWrapper>
            <PaymentWrapper>
              <Row>
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
        </Box>
      </LayoutContentWrapper>
    </>
  );
}
