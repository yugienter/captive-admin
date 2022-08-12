import Buttons from "@iso/components/uielements/button";
import Table from "@iso/containers/Tables/AntTables/AntTables.styles";
import { palette } from "styled-theme";
import styled from "styled-components";

const TagItem = styled.span`
   {
    background: #dceeff;
    border-radius: 10px;
    padding: 4px 8px;
    display: inline-block;
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    color: #0085ff;
    margin: 4px;
  }
`;

const TableWrapper = styled(Table)`
  .ant-table-bordered .ant-table-thead > tr > th,
  .ant-table-bordered .ant-table-tbody > tr > td {
    white-space: normal;
    &.noWrapCell {
      white-space: nowrap;
    }

    @media only screen and (max-width: 920px) {
      white-space: nowrap;
    }
  }
`;

const StatusTag = styled.span`
  padding: 0 5px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background-color: ${palette("primary", 0)};
  font-size: 12px;
  color: #ffffff;
  text-transform: capitalize;

  &.draft {
    background-color: ${palette("warning", 0)};
  }

  &.publish {
    background-color: ${palette("success", 0)};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const ButtonHolders = styled.div``;

const ComponentTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${palette("text", 0)};
  margin: 5px 0;
`;

const ActionBtn = styled(Buttons)`
  && {
    padding: 0 12px;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }

    i {
      font-size: 17px;
      color: ${palette("text", 1)};
    }

    &:hover {
      i {
        color: inherit;
      }
    }
  }
`;

const Fieldset = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: 13px;
  color: ${palette("text", 1)};
  line-height: 1.5;
  font-weight: 500;
  padding: 0;
  margin: 0 0 8px;
`;

const ActionWrapper = styled.div`
  display: flex;
  align-content: center;

  a {
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }

    i {
      font-size: 18px;
      color: ${palette("primary", 0)};

      &:hover {
        color: ${palette("primary", 4)};
      }
    }

    &.deleteBtn {
      i {
        color: ${palette("error", 0)};

        &:hover {
          color: ${palette("error", 2)};
        }
      }
    }
  }
`;

const PaymentWrapper = styled.div`
  .filter-status {
    display: inline-flex;
    li {
      border: 1px solid #e8e8ea;
      border-radius: 10px;
      padding: 4px 8px;
      cursor: pointer;
      font-style: normal;
      font-weight: bold;
      font-size: 13px;
      line-height: 135%;
      margin-right: 20px;
    }
    .active {
      color: #0085ff;
    }
  }
  .payment-item-row {
    display: flex;
    width: 100%;
  }
  .payment-item-small {
    margin-left: 20px;
    display: inline-block;
    background: #ffffff;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08),
      0px 2px 4px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    width: 100%;
    margin-bottom: 20px;
    border-left: 5px solid #ffb780;
    .row-content {
      width: 100%;
      padding: 12px 22px;
      align-items: center;
      justify-content: space-between;
      display: inline-flex;
      .right-content {
        display: inline-flex;
        align-items: center;
      }
    }
    .row-table {
      width: 100%;
    }
  }
  .payment-item-small.expanded {
    border-left: 5px solid #ffffff;
  }
  .payment-item-small.expanded .order-dropdown {
    transform: rotate(180deg);
  }
  .expanded-show {
    display: none;
  }
  .expanded-hide {
    display: inline-block;
  }
  .payment-item-small.expanded .expanded-hide {
    display: none;
  }
  .payment-item-small.expanded .expanded-show {
    display: inline-block;
  }
  .col-text {
    color: #E8E8EA;
  }
  .payment-item-title, .payment-item-subtitle {
    display: inline-flex;
    width: 100%;
    align-items: center;
    font-size: 15px;
    line-height: 147%;
  }
  .payment-item-subtitle {
    margin-top: 10px;
  }
  .total-order {
    color: #0085FF;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }
  .date-text {
    color: gray;
  }
  .payment-user {
    display: inline-flex;
    align-items: center;
    img {
      border-radius: 50%;
    }
  }
  .amount-text {
    font-weight: bold;
    font-size: 18px;
    line-height: 135%;
    color: #34303E;
  }
  .payment-status {
    font-weight: 600;
    font-size: 12px;
    line-height: 130%;
  }
  .payment-submitted {
    color: #FF9A4D;
  }
  .payment-verify {
    color: #1D92FF;
  }
  .payment-approved {
    color: #000000;
  }
  .payment-rejected {
    color: #F76969;
  }
  .primary-btn {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    font-size: 14px;
    line-height: 112%;
    color: #ffffff;
    background: linear-gradient(254.81deg, #1A5AFF 8.13%, #1EE9B6 92.46%);
    border-radius: 10px;
    padding: 6px 18px;
    border: none;
    margin-left: 20px;
    margin-right: 20px;
    cursor: pointer;
  }
  .attachment-icon {
    cursor: pointer;
  }
  .more-icon {
    margin-left: 20px;
    cursor: pointer;
  }
  .action-row {
    display: inline-flex;
  }
  .action-row svg {
    cursor: pointer;
  }
`;

const Form = styled.div``;

export {
  ActionBtn,
  Fieldset,
  Label,
  Form,
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  StatusTag,
  TagItem,
  PaymentWrapper,
};
