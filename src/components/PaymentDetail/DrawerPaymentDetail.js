import { Button, Drawer, message } from "antd";
import {
  CopyIcon,
  DownLoadIcon,
  IconCloseDrawer,
  LineDivider,
  OrderDetail,
  PaidIcon,
} from "@iso/containers/PaymentManage/Icon";
import { IconDeleteProof, IconUploadProof } from "../PaymentRelease/Icon";
import React, { useEffect } from "react";
import { paymentCodePrefix, paymentTypeText } from "@api/payment";

import Image from "@iso/components/Image";
import OrderInfo from "./OrderInfo";
import RelationPaymentInfo from "./RelationPaymentInfo";
import SuperFetch from "@api/action";
import axios from "axios";
import { formatMoney } from "@iso/lib/helpers/format";
import { mediaUrl } from "@api/action";
import moment from "moment";
import { updatePaymentProof, updatePaymentStatus } from "../../api/payment";
import { uploadMedia } from "../../api/media";
import "./styles.css";
import { useDispatch } from "react-redux";
import dataActions from "@iso/redux/payment/actions";

const { changeStatusItem, loadCountData } = dataActions;

const DrawerPaymentDetail = ({
  payment,
  handleClose,
  visible,
  refreshData = false,
}) => {
  const [relationPaymentData, setRelationPaymentData] = React.useState([]);
  const [proofData, setProofData] = React.useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setProofData(payment.proof ?? []);
  }, [payment.proof]);

  const copyCode = () => {
    navigator.clipboard.writeText(payment.code);
  };

  const getRelationPayment = async () => {
    const customQuery = `admin/payments/info?codes=${payment.paymentCodes}`;
    const { result, data } = await SuperFetch.get(customQuery);
    if (!result) return;
    setRelationPaymentData(data);
  };

  const onProofChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const data = await uploadMedia(formData);
    if (!data) {
      message.error("Upload failed");
      return;
    }
    await updateProof([...proofData, data.url]);
    callUpdateProof([...proofData, data.url]);
  };

  const callUpdateProof = (proof) => {
    updatePaymentProof(payment.code, proof);
    if (refreshData) refreshData();
  };

  const deleteProof = async (url) => {
    setProofData(proofData.filter((item) => item !== url));
    callUpdateProof(proofData.filter((item) => item !== url));
  };

  const updateProof = async (proof) => {
    setProofData(proof);
  };

  const downloadFile = (url) => {
    try {
      axios({
        url,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = fileUrl;
        url = url.split(".");
        const type = url[url.length - 1];
        link.setAttribute("download", "proof." + type);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const verifyAsPaid = async () => {
    const { result } = await updatePaymentStatus(payment.code, "approved");
    if (result) {
      dispatch(changeStatusItem(payment.code, "approved"));
      dispatch(loadCountData());
      message.success("Payment change status success");
      return;
    }
    message.error("Payment change status error");
  }

  useEffect(() => {
    if (payment.paymentCodes && payment.paymentCodes.length > 0) {
      getRelationPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment]);

  if (!payment) return <div></div>;
  return (
    <Drawer
      className={"drawer-main drawer-complete-job"}
      placement="right"
      width={460}
      onClose={handleClose}
      visible={visible}
      closeIcon={<IconCloseDrawer />}
      title="Payment Details"
    >
      <div className="conversation-drawer-content">
        <div className="payment-header">
          <OrderDetail />
          <br />
          <strong>{paymentTypeText(payment)}</strong>
          <h4>${formatMoney(payment.total)}</h4>
          <span className="date-verify">
            Verified Date:{" "}
            {payment.status === "approved"
              ? moment(payment.verifiedAt).format("DD MMM YYYY, HH:mm")
              : ""}
          </span>
        </div>
        <div className="payment-box">
          <div className="w-full header-row">
            <div className="text-gray">Payment ID</div>
            <div className={payment.status === "approved" ? "" : "opacity-0"}>
              <PaidIcon />
            </div>
            <div className="cursor-pointer" onClick={copyCode}>
              <strong>
                {paymentCodePrefix(payment)}
                {payment.code}
              </strong>
              &nbsp;
              <CopyIcon />
            </div>
          </div>
          <div className="w-full">
            <LineDivider />
          </div>
          <div className="w-full">
            <strong>Proof Upload</strong>
            <br />
            <br />
            <ul className="list-proof">
              {proofData &&
                proofData.map((item, index) => (
                  <li key={item} className="proof-item">
                    <div className="file-info">
                      <Image src={mediaUrl(item)} alt="" />
                      &nbsp;&nbsp;
                      <div className="file-content">
                        <span>Proof {index + 1}</span>
                        <br />
                        {moment(item.createdAt).format("DD MMM YYYY, HH:mm")}
                      </div>
                    </div>
                    <div className="inline-flex items-center">
                      <div
                        className="cursor-pointer"
                        onClick={() => downloadFile(mediaUrl(item))}
                      >
                        <DownLoadIcon />
                      </div>
                      &nbsp;&nbsp;
                      {payment.source === "scx" && (
                        <div
                          className="cursor-pointer"
                          onClick={() => deleteProof(item)}
                        >
                          <IconDeleteProof />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              <br />
              <input
                onChange={onProofChange}
                style={{ display: "none" }}
                id="proof"
                type="file"
                name="myImage"
                accept="image/png, image/gif, image/jpeg, application/pdf"
              />
              {payment.source === "scx" && (
                <label
                  htmlFor="proof"
                  className="payment-detail__card__proof__action"
                >
                  <span>
                    <IconUploadProof />
                  </span>{" "}
                  Upload Proof
                </label>
              )}
            </ul>
            {payment.status === "submitted" && (
              <button onClick={verifyAsPaid} className="primary-btn">
                Verify as Paid
              </button>
            )}
          </div>
        </div>
        {payment.source !== "scx" && <OrderInfo payment={payment} />}
        {payment.source === "scx" && (
          <>
            <br />
            <br />
            <h4>
              <strong>Relation payments</strong>
            </h4>
            <div className="list-payment-box">
              {relationPaymentData.map((item, index) => (
                <RelationPaymentInfo key={index} payment={item} />
              ))}
            </div>
          </>
        )}
        <div className="w-full text-center">
          <br />
          <LineDivider />
          <br />
          <br />
          <Button onClick={handleClose} className="btn-text-close">
            Close
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
export default DrawerPaymentDetail;
