import { Button, Col, Modal, Row } from "antd";

import { ModalApproveOrderIcon } from "@iso/containers/Payment/Icon";
import React from "react";

const RejectOrder = ({ handleOk, handleClose, visible, children }) => {
  return (
    <Modal
      centered
      visible={visible}
      footer={false}
      closable={false}
      className="modal-approve-order"
    >
      <ModalApproveOrderIcon />
      {children}
      <Row>
        <Col span={12}>
          <Button onClick={handleClose} primary="true">
            Cancel
          </Button>
        </Col>
        <Col span={12}>
          <Button onClick={handleOk} type="primary" danger="true">
            Reject
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
export default RejectOrder;
