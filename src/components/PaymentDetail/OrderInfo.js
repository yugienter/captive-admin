import {
  LineDivider,
  OrderInfoIcon,
  PlatformFeeInfoIcon,
} from "@iso/containers/PaymentManage/Icon";

import Image from "@iso/components/Image";
import React from "react";
import { formatMoney } from "@iso/lib/helpers/format";
import { mediaUrl } from "@api/action";
import moment from "moment";

const OrderInfo = ({ payment }) => {
  return (
    <div className="payment-box order-box">
      <div className="header-row">
        <div>
          <div className="inline-flex items-center">
            <OrderInfoIcon />
            &nbsp;&nbsp;
            <div>
              <strong>Order</strong> sent
              <br />
              {moment(payment.createdAt).format("DD MMM YYYY, HH:mm")}
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="w-full">
        <LineDivider />
      </div>
      <div className="w-full">
        <div className="w-full inline-flex items-center product-item">
          {payment?.job?.product?.media.length > 0 && (
            <Image
              src={mediaUrl(payment?.job?.product?.media[0].url)}
              width={52}
              height={52}
              alt=""
            />
          )}
          &nbsp;&nbsp;&nbsp;
          <div>
            <strong className="large-text">
              {payment?.job?.product?.name}
            </strong>
            <br />
            Public RRP: <strong>${formatMoney(payment?.job?.publicRRP)}</strong>
          </div>
        </div>
        <br />
        {payment.source === "company" && payment.receive === "scx" ? (
          <div className="mt-16 w-full inline-flex items-center justify-between">
            <div>Fixed Rate</div>
            <div className="">${formatMoney(payment.productTotal)}</div>
          </div>
        ) : (
          <>
            <div className="mt-16 w-full inline-flex items-center justify-between">
              <div>
                Order Total <strong>({payment.orders.length} items)</strong>
              </div>
              <div>${formatMoney(payment.productAmount)}</div>
            </div>
            <div className="mt-16 w-full inline-flex items-center justify-between">
              <div>
                Commission <strong>({payment.commissionUnit})</strong>
              </div>
              <div className="commission-text">
                - ${formatMoney(payment.commission)}
              </div>
            </div>
          </>
        )}
        <div className="mt-16 w-full inline-flex items-center justify-between">
          <div>
            Platform Fee <PlatformFeeInfoIcon />
          </div>
          <div>+ ${formatMoney(payment.platformFee)}</div>
        </div>
        <div className="mt-16 w-full">
          <LineDivider />
        </div>
        <div className="mt-16 w-full inline-flex items-center justify-between large-text">
          <div>Total Payment</div>
          <div>
            <strong>${formatMoney(payment.total)}</strong>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};
export default OrderInfo;
