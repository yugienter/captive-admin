import { Button, Col, Row, Switch } from "antd";
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
import dataActions from "@iso/redux/host/actions";
import { mediaUrl } from "@api/action";
import moment from "moment";

const { loadData, saveData, toggleModal, update } = dataActions;

export default function View() {
  const [search, setSearch] = useState("");
  const { data, record, modalActive, isLoading, page, limit } = useSelector(
    (state) => state.Host
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

  const onRecordSwitch = (value, key) => {
    if (key) record[key] = value;
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
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Gender",
      dataIndex: "sex",
      key: "sex",
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
      title: "Finished Onboarding",
      dataIndex: "finishedOnboarding",
      key: "finishedOnboarding",
      render: (text,) => {
        return text ? "Yes" : "No";
      },
    },
    {
      title: "Rates",
      dataIndex: "rates",
      key: "rates",
    },
    {
      title: "Followers",
      dataIndex: "followers",
      key: "followers",
      render: (text, row) => {
        return (
          <div>
            Followers: {row.followers ?? 0}<br />
            Facebook: {row.facebookFollowers ?? 0} <br />
            Instagram: {row.instagramFollowers ?? 0} <br />
            TikTok: {row.tiktokFollowers ?? 0} <br />
            Other: {row.otherFollowers ?? 0} 
          </div>
        );
      },
    },
    {
      title: "Socials",
      dataIndex: "social",
      key: "social",
      render: (text, row) => {
        return (
          <div>
            <a href={text.facebook ?? "#"} target="_blank" rel="noopener noreferrer">Facebook</a><br />
            <a href={text.instagram ?? "#"} target="_blank" rel="noopener noreferrer">Instagram </a><br />
            <a href={text.tiktok ?? "#"} target="_blank" rel="noopener noreferrer">TikTok </a><br />
          </div>
        );
      },
    },
    {
      title: "Portfolio",
      dataIndex: "porfolio",
      key: "porfolio",
      render: (text, row) => {
        return (
          <a href={text} target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
        );
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
            <ComponentTitle>Host Data</ComponentTitle>
            {/* <ButtonHolders>
              <ActionBtn type="primary" onClick={() => handleModal(null)}>
                Add new
              </ActionBtn>
            </ButtonHolders> */}
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
                <Label>Email</Label>
                <Input
                  label="Email"
                  placeholder="Enter Email"
                  value={record.email}
                  onChange={(e) => onRecordChange(e, "email")}
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
                <Label>Gender</Label>
                <Input
                  label="Gender"
                  placeholder=""
                  value={record.sex}
                  onChange={(e) => onRecordChange(e, "sex")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Portfolio</Label>
                <Input
                  label="Portfolio"
                  placeholder=""
                  value={record.porfolio}
                  onChange={(e) => onRecordChange(e, "porfolio")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Rates</Label>
                <Input
                  label="Rates"
                  placeholder=""
                  value={record.rates}
                  onChange={(e) => onRecordChange(e, "rates")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Finished Onboarding</Label>
                <Switch
                  style={{width: "50px"}}
                  label="Finished Onboarding"
                  placeholder=""
                  checked={record.finishedOnboarding}
                  onChange={(e) => onRecordSwitch(e, "finishedOnboarding")}
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
