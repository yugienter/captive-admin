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
import Input from "@iso/components/uielements/input";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import Modal from "@iso/components/Feedback/Modal";
import TextArea from "antd/lib/input/TextArea";
import dataActions from "@iso/redux/product/actions";
import moment from "moment";

const { loadData, saveData, toggleModal, update } = dataActions;

export default function View() {
  const [search, setSearch] = useState("");
  const { data, record, modalActive, isLoading, page, limit } = useSelector(
    (state) => state.Product
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text, row) => {
        return row?.company?.name ?? "";
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (text, row) => {
        return row?.brand?.name ?? "";
      },
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
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Weight Unit",
      dataIndex: "weightUnit",
      key: "weightUnit",
    },
    {
      title: "Country",
      dataIndex: "manufacturerCountry",
      key: "manufacturerCountry",
    },
    {
      title: "Manufacturer Name",
      dataIndex: "manufacturerName",
      key: "manufacturerName",
    },
    {
      title: "Product Benefits",
      dataIndex: "productBenefits",
      key: "productBenefits",
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
            <ComponentTitle>Product Data</ComponentTitle>
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
                <Label>Story</Label>
                <TextArea
                  label="Story"
                  placeholder=""
                  rows={3}
                  value={record.story}
                  onChange={(e) => onRecordChange(e, "story")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Currency</Label>
                <Input
                  label="Currency"
                  placeholder="Enter Currency"
                  value={record.currency}
                  onChange={(e) => onRecordChange(e, "currency")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Weight</Label>
                <Input
                  label="Weight"
                  placeholder=""
                  value={record.weight}
                  onChange={(e) => onRecordChange(e, "weight")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Weight Unit</Label>
                <Input
                  label="Weight Unit"
                  placeholder=""
                  value={record.weightUnit}
                  onChange={(e) => onRecordChange(e, "weightUnit")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Manufacturer Country</Label>
                <Input
                  label="Manufacturer Country"
                  placeholder=""
                  value={record.manufacturerCountry}
                  onChange={(e) => onRecordChange(e, "manufacturerCountry")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Manufacturer Name</Label>
                <Input
                  label="Manufacturer Name"
                  placeholder=""
                  value={record.manufacturerName}
                  onChange={(e) => onRecordChange(e, "manufacturerName")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Product Benefits</Label>
                <Input
                  label="Product Benefits"
                  placeholder=""
                  value={record.productBenefits}
                  onChange={(e) => onRecordChange(e, "productBenefits")}
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
