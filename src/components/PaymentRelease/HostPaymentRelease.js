import { Drawer, Radio, Space } from "antd";
import { IconBank, IconCard, IconNext, IconPricing } from "./Icon";

import { IconCloseDrawer } from "@iso/containers/PaymentManage/Icon";
import Image from "@iso/components/Image";
import React from "react";
import { formatMoney } from "@iso/lib/helpers/format";
import { mediaUrl } from "@api/action";

const HostPaymentRelease = ({
  deal,
  payment,
  handleClose,
  onContinue,
  visible,
}) => {
  const getJobName = (row) => {
    if (row?.job?.product?.name && row?.job?.campaign) {
      return `${row?.job?.product?.name} - ${row.job.campaign.name}`;
    }
    if (row?.job?.campaign) return row.job.campaign.name;
    return row?.job?.product?.name;
  };

  if (!deal) return <div></div>;
  return (
    <Drawer
      className={"drawer-main payment-drawer payment-detail submit-order"}
      placement="right"
      width={660}
      onClose={handleClose}
      visible={visible}
      closeIcon={<IconCloseDrawer />}
      title={<div className="payment-detail__title">Release Money</div>}
    >
      <div className="payment-detail__container drawer-submit-fixed-rate">
        <div className="payment-detail__order">
          <div className="payment-detail__order__detail">
            <div className="payment-detail__order__detail__job">
              <div className="payment-detail__order__detail__job__image">
                <Image
                  alt={deal.host.name}
                  className="dropdown-img"
                  src={mediaUrl(deal.host.avatar)}
                />
              </div>
              <div className="payment-detail__order__detail__job__info">
                <h4>{deal.host.name}</h4>
                <p>
                  Job Name:: <span>{getJobName(deal)}</span>
                </p>
              </div>
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      Fixed Rate
                    </td>
                    <td>${formatMoney(deal?.streamHourlyRate?.description)}</td>
                  </tr>
                </tbody>
              </table>
              <div className="payment-detail__order__detail__total">
                <span>Total Payment</span>
                <span>${formatMoney(deal?.streamHourlyRate?.description)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-method">
          <p className="title">
            <IconPricing /> Payment method
          </p>
          <div className="payment-method__options">
            <Radio.Group value={"bank"}>
              <Space direction="vertical">
                <Radio value="bank" checked={true}>
                  <div className="payment-method__option">
                    <div>
                      <IconBank />
                    </div>
                    <div className="payment-method__option__detail">
                      <p>Bank Transfer</p>
                      <p>It can take 2-5 business days</p>
                    </div>
                  </div>
                </Radio>
                <Radio value="xfers" disabled={true}>
                  <div className="payment-method__option">
                    <div>
                      <IconCard />
                    </div>
                    <div className="payment-method__option__detail">
                      <p>XFers</p>
                      <p>Require XFers account</p>
                    </div>
                  </div>
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className="drawer-submit-proposal__action">
          <div>
            <a href="#cancel" onClick={handleClose}>Cancel</a>
            <a href="#confirm" onClick={onContinue}>
              <IconNext />
              Confirm Payment
            </a>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
export default HostPaymentRelease;
