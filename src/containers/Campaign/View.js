import { Button, Col, Row } from "antd";
import {
  ComponentTitle,
  Fieldset,
  Form,
  Label,
  TableWrapper,
  TitleWrapper,
} from "./View.styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@iso/components/utility/box";
import ContentHolder from "@iso/components/utility/contentHolder";
import Input from "@iso/components/uielements/input";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import Modal from "@iso/components/Feedback/Modal";
import ViewExpanded from "./ViewExpanded";
import dataActions from "@iso/redux/campaign/actions";
import moment from "moment";

const { loadData, saveData, toggleModal, update } = dataActions;

export default function View() {
  const [search, setSearch] = useState("");
  const { data, record, modalActive, isLoading, page, limit } = useSelector(
    (state) => state.Campaign
  );
  const dispatch = useDispatch();

  const handleRecord = (actionName, item) => {
    if (item.code && actionName !== "delete") actionName = "update";
    dispatch(saveData(item, actionName));
  };

  const onRecordChange = (event, key) => {
    if (key) record[key] = event.target.value;
    dispatch(update(record));
  };

  const handleChange = (pagination, filters, sorter) => {
    const page = pagination.current;
    const limit = pagination.pageSize;
    const filter = { page, limit, search };
    dispatch(loadData(filter));
  };

  const getData = () => {
    const filter = { page, limit, search };
    dispatch(loadData(filter));
  };

  const campaignStatus = (value) => {
    switch (value) {
      case 'notStarted':
        return 'Not Started';
      case 'complete':
        return 'Complete';
      case 'inprogress':
        return 'In Progress';
      default:
        return value;
    }
  }

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text, row) => {
        return row?.company?.name ?? "";
      },
    },
    {
      title: "Campaign",
      dataIndex: "job",
      key: "job",
      render: (text, row) => {
        return row?.campaign?.name ?? "";
      },
    },
    {
      title: "Product",
      dataIndex: "job",
      key: "job",
      render: (text, row) => {
        return row?.product?.name ?? "";
      },
    },
    {
      title: "Status",
      dataIndex: "campaign.status",
      key: "campaign.status",
      render: (text, row) => {
        return campaignStatus(row?.campaign?.status ?? "");
      },
    },
    {
      title: "Bid Count",
      dataIndex: "totalBid",
      key: "totalBid",
    },
    {
      title: "Time start",
      dataIndex: "campaign.timeStart",
      key: "campaign.timeStart",
      render: (text, row) => {
        return moment(row?.campaign?.timeStart).format("DD-MM-YYYY");
      },
    },
    {
      title: "Time end",
      dataIndex: "campaign.timeEnd",
      key: "campaign.timeEnd",
      render: (text, row) => {
        return moment(row?.campaign?.timeEnd).format("DD-MM-YYYY");
      },
    },
    {
      title: "Public RRP",
      dataIndex: "publicRRP",
      key: "publicRRP",
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (text, row) => {
        return (text ?? "") + " " + (row?.discountPercentageUnit ?? "");
      },
    },
    {
      title: "Discount Start",
      dataIndex: "discountPeriodStart",
      key: "discountPeriodStart",
      render: (text, row) => {
        return moment(text).format("DD-MM-YYYY");
      },
    },
    {
      title: "Discount End",
      dataIndex: "discountPeriodEnd",
      key: "discountPeriodEnd",
      render: (text, row) => {
        return moment(text).format("DD-MM-YYYY");
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

  return (
    <LayoutContentWrapper>
      <Box>
        <ContentHolder style={{ marginTop: 0, overflow: "hidden" }}>
          <TitleWrapper>
            <ComponentTitle>Campaign Data</ComponentTitle>
          </TitleWrapper>
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

          <Modal
            visible={modalActive}
            onClose={() => dispatch(toggleModal(null))}
            title={record.code ? "Update Record" : "Add New Record"}
            okText={record.code ? "Update Record" : "Add Record"}
            onOk={() => handleRecord("insert", record)}
            onCancel={() => dispatch(toggleModal(null))}
          >
            <Form>
              <Fieldset>
                <Label>Title</Label>
                <Input
                  label="Name"
                  placeholder="Enter Name"
                  value={record.name}
                  onChange={(e) => onRecordChange(e, "name")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Country</Label>
                <Input
                  label="Country"
                  placeholder="Enter Country"
                  value={record.countryOrigin}
                  onChange={(e) => onRecordChange(e, "countryOrigin")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Registration No</Label>
                <Input
                  label="Registration No"
                  placeholder=""
                  value={record.registrationNo}
                  onChange={(e) => onRecordChange(e, "registrationNo")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Phone Number</Label>
                <Input
                  label="Phone Number"
                  placeholder=""
                  value={record.phoneNumber}
                  onChange={(e) => onRecordChange(e, "phoneNumber")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Website</Label>
                <Input
                  label="Website"
                  placeholder=""
                  value={record.website}
                  onChange={(e) => onRecordChange(e, "website")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Year Establishment</Label>
                <Input
                  label="Year Establishment"
                  placeholder=""
                  value={record.yearEstablisment}
                  onChange={(e) => onRecordChange(e, "yearEstablisment")}
                />
              </Fieldset>
            </Form>
          </Modal>
          <TableWrapper
            columns={columns}
            bordered={true}
            dataSource={data.data}
            loading={isLoading}
            className="isoSimpleTable"
            rowKey="code"
            onChange={handleChange}
            expandable={{
              expandedRowRender: record => <ViewExpanded jobCode={record.code} />,
              rowExpandable: record => true,
            }}
            pagination={{
              hideOnSinglePage: true,
              total: data.total,
              showTotal: (total, range) => {
                return `Showing ${range[0]}-${range[1]} of ${data.total} Results`;
              },
            }}
          />
        </ContentHolder>
      </Box>
    </LayoutContentWrapper>
  );
}
