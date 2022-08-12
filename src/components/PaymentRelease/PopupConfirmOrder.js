import {
  IconCopy,
  IconDeleteProof,
  IconDownloadProof,
  IconUpBig,
  IconUploadProof,
} from "./Icon";
import { Modal, message } from "antd";
import React, { useEffect } from "react";

import Image from "@iso/components/Image";
import axios from "axios";
import { mediaUrl } from "../../api/action";
import { updatePaymentProof } from "../../api/payment";
import { uploadMedia } from "../../api/media";

function PopupConfirmOrder({ payment, visible, handleClose, handleOK }) {
  const [proofData, setProofData] = React.useState([]);

  useEffect(() => {
    setProofData(payment.proof ?? []);
  }, [payment.proof]);

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
  }

  const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const download = (uri) => {
    try {
      axios({
        url: uri,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        uri = uri.split(".");
        const type = uri[uri.length - 1];
        link.setAttribute("download", "proof." + type);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProof = async (url) => {
    setProofData(proofData.filter((item) => item !== url));
    callUpdateProof(proofData.filter((item) => item !== url));
  };

  const updateProof = async (proof) => {
    setProofData(proof);
  };

  if (!payment) return <div></div>;
  return (
    <Modal
      centered
      visible={visible}
      footer={(null, null)}
      onCancel={handleClose}
      maskClosable={false}
      closable={false}
    >
      <div className="confirm-order payment-detail__container">
        <div className="payment-detail__info">
          <h4>Payment Sent</h4>
          <span>
            <IconUpBig />
          </span>
          <p className="payment-detail__info__title">Release Money</p>
          <p>Pay amount:</p>
          <p className="payment-detail__info__amount">${payment.total}</p>
        </div>
        <div className="payment-detail__card">
          <div className="payment-detail__card__status">
            <table>
              <tr>
                <td>Payment ID</td>
                <td>
                  <strong>{`RM${payment.code}`}</strong>&nbsp;
                  <a href="#copy" onClick={() => copyToClipBoard(`RM${payment.code}`)}>
                    <IconCopy />
                  </a>
                </td>
              </tr>
            </table>
          </div>
          <div className="payment-detail__card__proof">
            <>
              <p className="payment-detail__card__proof__title">Proof Upload</p>
              {proofData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: 15,
                  }}
                >
                  <div className="payment-detail__card__proof__file">
                    <div className="payment-detail__card__proof__file__preview">
                      <Image src={mediaUrl(item)} alt="proof" />
                    </div>
                    <div className="payment-detail__card__proof__file__info">
                      <p>Proof {index + 1}</p>
                    </div>
                    <div className="payment-detail__card__proof__file__action">
                      {/* <a><IconEditProof /></a> */}
                      <a href="#download" onClick={() => download(mediaUrl(item))}>
                        <IconDownloadProof />
                      </a>
                      <a href="#delete" onClick={() => deleteProof(item)}>
                        <IconDeleteProof />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </>
            <div
              className="payment-detail__card__proof--nofile"
              style={{
                marginTop: 15,
              }}
            >
              <input
                onChange={onProofChange}
                style={{ display: "none" }}
                id="proof"
                type="file"
                name="myImage"
                accept="image/png, image/gif, image/jpeg, application/pdf"
              />
              <div>
                <label
                  htmlFor="proof"
                  style={{
                    width: "50%",
                  }}
                  className="payment-detail__card__proof__action"
                >
                  <span>
                    <IconUploadProof />
                  </span>{" "}
                  Upload Proof
                </label>
                <a href="#done" onClick={handleOK}>Done</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PopupConfirmOrder;
