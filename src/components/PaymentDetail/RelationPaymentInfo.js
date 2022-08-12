import {
  CopyIcon,
  DownLoadIcon,
  LineDivider,
  PaidIcon,
} from "@iso/containers/PaymentManage/Icon";
import { paymentCodePrefix, paymentTypeText } from "@api/payment";

import Image from "@iso/components/Image";
import React from "react";
import axios from "axios";
import { formatMoney } from "@iso/lib/helpers/format";
import { mediaUrl } from "@api/action";
import moment from "moment";

const RelationPaymentInfo = ({ payment }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(payment.code);
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

  return (
    <>
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
        <table className="w-full">
          <tbody>
            {payment.source === "host" && <tr>
              <td>Products</td>
              <td className="text-right">{payment.productTotal} items</td>
            </tr>}
            <tr>
              <td>{paymentTypeText(payment)}</td>
              <td className="text-right">${formatMoney(payment.total - payment.platformFee)}</td>
            </tr>
            <tr>
              <td>Platform Fee</td>
              <td className="text-right">${formatMoney(payment.platformFee)}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td className="text-right">${formatMoney(payment.total)}</td>
            </tr>
          </tbody>
        </table>
        <div className="w-full">
          <LineDivider />
        </div>
        <div className="w-full">
          <strong>Proof Upload</strong>
          <br />
          <br />
          <ul className="list-proof">
            {payment.proof &&
              payment.proof.map((item, index) => (
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
                  <div
                    className="cursor-pointer"
                    onClick={() => downloadFile(mediaUrl(item))}
                  >
                    <DownLoadIcon />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <br />
    </>
  );
};
export default RelationPaymentInfo;
