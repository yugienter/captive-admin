import { Button, Col, Row } from "antd";
import {
  ComponentTitle,
  Fieldset,
  Form,
  Label,
  TableWrapper,
  TagItem,
  TitleWrapper,
} from "./View.styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@iso/components/utility/box";
import ContentHolder from "@iso/components/utility/contentHolder";
import Image from "@iso/components/Image";
import Input from "@iso/components/uielements/input";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import Modal from "@iso/components/Feedback/Modal";
import ViewExpanded from "./ViewExpanded";
import dataActions from "@iso/redux/company/actions";
import { mediaUrl } from "@api/action";
import moment from "moment";

const { loadData, saveData, toggleModal, update } = dataActions;

export default function View() {
  const [search, setSearch] = useState("");
  const { data, record, modalActive, isLoading, page, limit } = useSelector(
    (state) => state.Company
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
  }

  React.useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: "80px",
      render: (text, row) => {
        return <Image src={mediaUrl(text)} alt="" width="50" height="50" />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Country",
      dataIndex: "countryOrigin",
      key: "countryOrigin",
    },
    {
      title: "Tag",
      dataIndex: "tagData",
      key: "tagData",
      width: "200px",
      render: (text, row) => {
        return row.tagData && row.tagData.map((item) => (
          <TagItem className="tag-item" key={item.code}>
            {item.name}
          </TagItem>
        ));
      },
    },
    {
      title: "Registration No",
      dataIndex: "registrationNo",
      key: "registrationNo",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (text, row) => {
        return (
          <a href={text} target="_blank" rel="noopener noreferrer">
            Website
          </a>
        );
      },
    },
    {
      title: "Year Establishment",
      dataIndex: "yearEstablisment",
      key: "yearEstablisment",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, row) => {
        return moment(text).format("DD-MM-YYYY");
      },
    },
    // {
    //   title: "Actions",
    //   key: "action",
    //   width: "60px",
    //   fixed: "right",
    //   className: "noWrapCell",
    //   render: (text, row) => {
    //     return (
    //       <ActionWrapper>
    //         <a onClick={() => handleModal(row)} href="# ">
    //           <i className="ion-android-create" />
    //         </a>

    //         <Popconfirms
    //           title="Are you sure to delete this record？"
    //           okText="Yes"
    //           cancelText="No"
    //           placement="topRight"
    //           onConfirm={() => handleRecord("delete", row)}
    //         >
    //           <a className="deleteBtn" href="# ">
    //             <i className="ion-android-delete" />
    //           </a>
    //         </Popconfirms>
    //       </ActionWrapper>
    //     );
    //   },
    // },
  ];

  return (
    <LayoutContentWrapper>
      <Box>
        <ContentHolder style={{ marginTop: 0, overflow: "hidden" }}>
          <TitleWrapper>
            <ComponentTitle>Company Data</ComponentTitle>
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
              <Button onClick={() => getData()} type="primary">Search</Button>
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
                <Label>Name</Label>
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
              expandedRowRender: record => <ViewExpanded companyCode={record.code} />,
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
