import { font, palette } from "styled-theme";

import { createGlobalStyle } from "styled-components";

// import 'antd/dist/antd.css';

const GlobalStyles = createGlobalStyle`
  .ant-btn{
    border-radius: 4px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
  }

  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #f8f8f8!important;
  }

  .ant-row.ant-form-item {
    margin-bottom: 5px;
  }

  .has-success.has-feedback {
    .ant-select {
      .ant-select-selection {
        .ant-select-selection__rendered {
          .ant-select-selection__placeholder {
            display: none !important;
          }
        }
      }
    }
  }

  /*-----------------------------------------------*/
  // style for project category menu [ScrumBoard]
  /*-----------------------------------------------*/
  .project-category {
    .ant-select-dropdown-menu {
      .ant-select-dropdown-menu-item {
        padding: 8px 12px;
        color: #000000;
        font-family: 'Nunito Sans';
        font-weight: 400;
      }
    }
  }

  /*-----------------------------------------------*/
  // style for project menu [ScrumBoard]
  /*-----------------------------------------------*/
  .ant-dropdown {
    &.project-menu {
      width: 280px;
      top: 133px !important;

      .ant-dropdown-menu {
        padding: 0;
        overflow: hidden;

        .ant-dropdown-menu-item {
          min-height: 54px;
          line-height: auto;
          display: flex;
          align-items: center;
          padding: 10px 20px;

          &:first-child {
            padding: 0;
            border-bottom: 1px solid #f4f6fd;

            &:hover,
            &:focus {
              background-color: #ffffff;
            }
          }

          &:hover,
          &:focus {
            background-color: #F3F5FD;
          }

          &:last-child {
            background-color: #E6EAF8;
          }
        }
      }
    }
  }

  /*-----------------------------------------------*/
  // style for popover [ScrumBoard]
  /*-----------------------------------------------*/
  .ant-popover {
    .ant-checkbox-group {
      display: flex;
      flex-direction: column;
      .ant-checkbox-group-item {
        margin: 5px 0;
        span {
          font-size: 14px;
          color: #788195;
          text-transform: capitalize;
        }
      }
    }
  }

  /*-----------------------------------------------*/
  // style for modal [ScrumBoard]
  /*-----------------------------------------------*/
  .ant-modal-wrap {
    .ant-modal {
      .ant-modal-content {
        .ant-modal-body {
          .render-form-wrapper {
            padding: 10px;
            h2 {
              margin: 0;
            }
            form {
              padding: 15px 0 3px;
              .field-container {
                margin-bottom: 26px;
              }
            }
          }
        }
      }
    }
  }


/*-----------------------------------------------*/
  // style form previous GlobalStyles
  /*-----------------------------------------------*/

  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #f8f8f8!important;
}

font-family: ${font("primary", 0)};

h1,
h2,
h3,
h4,
h5,
h6,
a,
p,
li,
input,
textarea,
span,
div,
img,
svg {
  &::selection {
    background: ${palette("primary", 0)};
    color: #fff;
  }
}

.ant-row:not(.ant-form-item) {
  ${
    "" /* margin-left: -8px;
  margin-right: -8px; */
  };
  &:before,
  &:after {
    display: none;
  }
}

.ant-row > div {
  padding: 0;
}

.isoLeftRightComponent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.isoCenterComponent {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
/********** Add Your Global CSS Here **********/

body {
  -webkit-overflow-scrolling: touch;
}

html h1,
html h2,
html h3,
html h4,
html h5,
html h6,
html a,
html p,
html li,
input,
textarea,
span,
div,
html,
body,
html a {
  margin-bottom: 0;
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
}

html ul {
  -webkit-padding-start: 0px;
  list-style: none;
  margin-bottom: 0;
}

.scrollbar-track-y,
.scrollbar-thumb-y {
  width: 5px !important;
}

.scrollbar-track-x,
.scrollbar-thumb-x {
  height: 5px !important;
}

.scrollbar-thumb {
  border-radius: 0 !important;
}

.scrollbar-track {
  background: rgba(222, 222, 222, 0.15) !important;
}

.scrollbar-thumb {
  border-radius: 0 !important;
  background: rgba(0, 0, 0, 0.5) !important;
}

.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow:after,
.ant-popover-placement-bottomLeft
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-bottomRight
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-top > .ant-popover-content > .ant-popover-arrow:after,
.ant-popover-placement-topLeft
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-topRight
  > .ant-popover-content
  > .ant-popover-arrow:after {
  left: 0;
  margin-left: -4px;
}

/* Instagram Modal */

.ant-modal-wrap.instagram-modal .ant-modal {
  max-width: 935px;
  width: 100% !important;
}

@media only screen and (max-width: 991px) {
  .ant-modal-wrap.instagram-modal .ant-modal {
    padding: 0 60px;
  }
}

@media only screen and (max-width: 767px) {
  .ant-modal-wrap.instagram-modal .ant-modal {
    max-width: 580px;
  }
}

.ant-modal-wrap.instagram-modal .ant-modal-content {
  border-radius: 0;
}

.ant-modal-wrap.instagram-modal .ant-modal-content button.ant-modal-close {
  position: fixed;
  color: #fff;
}

.ant-modal-wrap.instagram-modal .ant-modal-content button.ant-modal-close i {
  font-size: 24px;
}

.ant-modal-wrap.instagram-modal .ant-modal-content .ant-modal-body {
  padding: 0;
}

/********** Add Your Global RTL CSS Here **********/

/* Popover */

html[dir='rtl'] .ant-popover {
  text-align: right;
}

/* Ecommerce Card */

html[dir='rtl'] .isoCardInfoForm .ant-input {
  text-align: right;
}

/* Modal */

html[dir='rtl'] .has-success.has-feedback:after,
html[dir='rtl'] .has-warning.has-feedback:after,
html[dir='rtl'] .has-error.has-feedback:after,
html[dir='rtl'] .is-validating.has-feedback:after {
  left: 0;
  right: auto;
}

html[dir='rtl'] .ant-modal-close {
  right: inherit;
  left: 0;
}

html[dir='rtl'] .ant-modal-footer {
  text-align: left;
}

html[dir='rtl'] .ant-modal-footer button + button {
  margin-left: 0;
  margin-right: 8px;
}

html[dir='rtl'] .ant-confirm-body .ant-confirm-content {
  margin-right: 42px;
}

html[dir='rtl'] .ant-btn > .anticon + span,
html[dir='rtl'] .ant-btn > span + .anticon {
  margin-right: 0.5em;
}

html[dir='rtl'] .ant-btn-loading span {
  margin-left: 0;
  margin-right: 0.5em;
}

html[dir='rtl']
  .ant-btn.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline) {
  padding-left: 25px;
  padding-right: 29px;
}

html[dir='rtl']
  .ant-btn.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline)
  .anticon {
  margin-right: -14px;
  margin-left: 0;
}

/* Confirm */

html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-body > .anticon {
  margin-left: 16px;
  margin-right: 0;
  float: right;
}

html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-btns {
  float: left;
}

html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-btns button + button {
  margin-right: 10px;
  margin-left: 0;
}

/* Message */

html[dir='rtl'] .ant-message .anticon {
  margin-left: 8px;
  margin-right: 0;
}

/* Pop Confirm */

html[dir='rtl'] .ant-popover-message-title {
  padding-right: 20px;
  padding-left: 0;
}

html[dir='rtl'] .ant-popover-buttons {
  text-align: left;
}

/* Notification */

html[dir='rtl']
  .ant-notification-notice-closable
  .ant-notification-notice-message {
  padding-left: 24px;
  padding-right: 0;
}

html[dir='rtl']
  .ant-notification-notice-with-icon
  .ant-notification-notice-message,
html[dir='rtl']
  .ant-notification-notice-with-icon
  .ant-notification-notice-description {
  margin-right: 48px;
}

html[dir='rtl'] .ant-notification-notice-close {
  right: auto;
  left: 16px;
}

html[dir='rtl'] .ant-notification-notice-with-icon {
  left: 0;
}

/* Dropzone */

html[dir='rtl'] .dz-hidden-input {
  display: none;
}
.dropdown-order ul {
  background: #FFFFFF;
  box-shadow: 0px 4px 56px rgba(0, 0, 0, 0.08), 0px 12px 16px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
}
.modal-approve-order {
  .ant-modal-content {
    background: #ffffff;
    border-radius: 24px;
    text-align: center;
    h4 {
      font-weight: 800;
      font-size: 24px;
      line-height: 132%;
      color: #34303e;
      margin-bottom: 20px;
      margin-top: 20px;
    }
    p {
      font-weight: normal;
      font-size: 16px;
      line-height: 147%;
      color: #4a4754;
    }
    .ant-btn {
      padding: 16px 76px;
      font-weight: bold;
      font-size: 14px;
      line-height: 112%;
      border-radius: 12px;
      height: initial;
    }
    .btn-approve {
      background: #1BD2A4;
    }
    .text-reject {
      background: #FFFFFF;
      border: 1px solid #E8E8EA;
      box-sizing: border-box;
      border-radius: 12px;
      width: 92%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}
.footer-bar-action {
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 4px 56px rgba(0, 0, 0, 0.08), 0px 12px 16px rgba(0, 0, 0, 0.08);
  height: 80px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  .hide-btn {
    opacity: 0.2;
    pointer-events: none;
  }
  .btn-approve:hover, .btn-approve:focus {
    color: #ffffff;
    background: #1BD2A4;
    border-color: #1BD2A4;
  }
  .btn-approve {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    background: #1BD2A4;
    border-radius: 10px;
    padding: 15px 10px;
    font-weight: bold;
    font-size: 14px;
    line-height: 112%;
    color: #ffffff;
  }
  .btn-normal {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #E8E8EA;
    border-radius: 10px;
    padding: 15px 10px;
    font-weight: bold;
    font-size: 14px;
    line-height: 112%;
    color: #615E69;
    margin-right: 10px;
  }
  .btn-reject:hover, .btn-reject:focus {
    color: #ffffff;
    background: #F76969;
    border-color: #F76969;
  }
  .btn-reject {
    margin-left: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    background: #F76969;
    border-radius: 10px;
    padding: 15px 10px;
    font-weight: bold;
    font-size: 14px;
    line-height: 112%;
    color: #ffffff;
  }
}
.text-red {
  color: red;
}
.ant-drawer.ant-drawer-open {
  .ant-drawer-mask {
    background: rgba(0, 0, 0, 0.45);
  }
  .ant-drawer-close {
    padding: 8px;
    box-shadow: 0px 4px 56px rgb(0 0 0 / 8%), 0px 12px 16px rgb(0 0 0 / 8%);
    border-radius: 14px;
    left: 0;
    margin-top: 25px;
    margin-left: -46px;
    color: #77757f;
    background: #fff;
    display: block !important;
    right: auto;
  }
}
.drawer-main-tabs {
  .ant-drawer-body {
    padding: 30px !important;
  }
}

.drawer-main {
  .ant-drawer-close {
    display: none;
  }
  .ant-drawer-content {
    overflow: visible;
  }
  .ant-drawer-header {
    background: #f9f9f9;
    padding: 30px 38px 20px 30px;
    border: 0;
  }
  .ant-drawer-title {
    font-size: 24px;
    font-weight: bold;
  }
}
.opacity-0 {
  opacity: 0;
  pointer-events: none;
}
.text-right {
  text-align: right;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.cursor-pointer {
  cursor: pointer;
}
.inline-flex {
  display: inline-flex;
}
.items-center {
  align-items: center;
}
.justify-between {
  justify-content: space-between;
}
.justify-center {
  justify-content: center;
}
.w-full {
  width: 100%;
}
.circle-row-avatar {
  border-radius: 50%;
}
.text-gray {
  color: #A5A3A9;
}
.payment-header {
  text-align: center;
  margin-bottom: 30px;
  h4 {
    font-weight: bold;
    font-size: 24px;
    line-height: 132%;
    color: #1D1929;
  }
  .date-verify {
    color: #A5A3A9;
    font-size: 12px;
    line-height: 130%;
  }
}
.payment-box {
  background: #FFFFFF;
  border: 1px solid #E8E8EA;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 10px 20px;
  .header-row {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    line-height: 147%;
  }
  .list-proof {
    display: inline-block;
    width: 100%;
    list-style: none;
    .proof-item {
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      font-size: 12px;
      line-height: 130%;
      color: #A5A3A9;
      span {
        color: #55ADFF;
        font-weight: bold;
        font-size: 13px;
        line-height: 135%;
      }
      img {
        width: 32px;
      }
      .file-info {
        display: inline-flex;
        align-items: center;
      }
    }
  }
}
.order-box {
  margin-top: 30px;
  font-size: 13px;
  line-height: 135%;
  .large-text {
    font-size: 15px;
    line-height: 147%;
  }
  .product-item {
    margin-top: 15px;
    img {
      border-radius: 12px;
    }
  }
}
.btn-text-close {
  border: none!important;
  color: #0085FF!important;
  font-weight: bold!important;
  font-size: 14px!important;
  line-height: 112%!important;
}
.commission-text {
  color: #FF7D1A;
}
.mt-16 {
  margin-top: 16px;
}
.number-count {
  background: #FF7D1A;
  border-radius: 6px;
  padding: 4px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 8px;
  color: #FFFFFF;
  min-width: 18px;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
}
.job-status {
  font-weight: 600;
  font-size: 14px;
  line-height: 130%;
}
.job-ordering {
  color: #1D92FF;
}
.job-verify {
  color: #1D92FF;
}
.job-ready {
  color: #1BD2A4;
}
.job-ended {
  color: #FF7D1A;
}
.job-completed {
  color: #000000;
}
.payment-in {
  color: #1BD2A4;
}
.payment-out {
  color: #DC2425;
}
.header-host-info {
  padding: 20px;
  img {
    border-radius: 12px;
  }
  h4 {
    font-weight: bold;
    font-size: 24px;
    line-height: 132%;
    color: #1D1929;
  }
  .job-name {
    font-weight: bold;
    font-size: 15px;
    line-height: 147%;
  }
  .job-status {
    border-radius: 16px;
    padding: 8px 16px;
    font-size: 14px;
    line-height: 112%;
  }
  .job-ordering, .job-execute {
    background: #DCEEFF;
    color: #1D92FF;
  }
  .job-ended, .job-complete {
    background: #E9FDF8;
    color: #FF7D1A;
  }
  .job-ready {
    background: #E9FDF8;
    color: #1EE9B6;
  }
  .job-completed {
    background: #E9FDF8;
    color: #000000;
  }
}
.total-info-item {
  background: #F9F9F9;
  border: 1px solid #E8E8EA;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 10px 20px;
  span {
    color: #8E8C94;
    font-weight: 600;
    font-size: 12px;
    line-height: 130%;
  }
  h4 {
    color: #4A4754;
    font-weight: 800;
    font-size: 24px;
    line-height: 132%;
  }
  .money-text {
    color: #4272B8;
  }
  .divider-total {
    margin-left: 30px;
    margin-right: 30px;
    svg {
      height: 100%;
    }
  }
  .scx-icon {
    margin-left: 20px;
  }
}
.dropdown-total > div {
  background: #F9F9F9;
  box-shadow: 0px 4px 56px rgba(0, 0, 0, 0.08), 0px 12px 16px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 10px 20px;
  .amount-dropdown {
    transform: rotate(180deg);
  }
  span {
    color: #8E8C94;
    font-weight: 600;
    font-size: 12px;
    line-height: 130%;
  }
  h4 {
    color: #4A4754;
    font-weight: 800;
    font-size: 24px;
    line-height: 132%;
  }
  .money-text {
    color: #4272B8;
  }
  .scx-icon {
    margin-left: 15px;
  }
  span {
    color: #8E8C94;
  }
  strong {
    font-size: 15px;
    line-height: 147%;
  }
}
.sort-btn {
  border: 1px solid #E8E8EA;
  border-radius: 10px;
  padding: 9px 10px;
  cursor: pointer;
  margin-top: 15px;
  min-width: 150px;
}
.list-payment-box {
  max-height: 40vh;
  overflow: auto;
}
.job-row-actions {
  padding: 10px 20px;
}

.submit-order {
  .payment-detail__order {
    margin: 0;
  }
  .payment-detail__container {
    padding: 0 !important;
  }
  .payment-detail__order__detail {
    border: none;
    padding: 0;
  }
  .drawer-submit-proposal__action {
    padding: 0;
    padding-top: 30px;
  }
  .payment-method {
    border-top: 2px dashed #e8e8ea;
    padding-top: 30px;
    margin-bottom: 30px;
    .ant-radio-wrapper {
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      margin-bottom: 15px;
    }
    .ant-radio-wrapper-checked {
      border: 1px solid #0085ff;
    }
    .ant-radio-wrapper {
      span {
        display: inline-block;
      }
    }
    .ant-radio-wrapper,
    .ant-space-item,
    .ant-space,
    .ant-radio-group {
      width: 100%;
    }
    .ant-radio {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
    .title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 30px;
    }
    p {
      margin: 0;
    }
    &__options {
      display: flex;
    }
    &__option {
      position: relative;
      padding: 10px 15px;
      display: flex;
      align-items: center;

      width: 100%;
      div {
        &:first-child {
          margin-right: 15px;
        }
        &:last-child {
          p {
            &:first-child {
              font-weight: 700;
            }
            &:last-child {
              color: #ff7d1a;
            }
          }
        }
      }
    }
  }
}

.confirm-order {
  .payment-detail__card__proof--nofile {
    div {
      display: flex;
      a {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  table {
    width: 100%;
    tr {
      td {
        &:last-child {
          text-align: right;
        }
      }
    }
  }
}
.drawer-submit-fixed-rate {
  h4 {
    font-weight: 800;
    font-size: 24px;
    line-height: 132%;
    color: #1D1929;
  }
}
.payment-detail__info {
  h4 {
    color: #34303E;
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 132%;
    margin-bottom: 30px;
  }
}
.payment-detail {
  &__order {
    margin-top: 30px;
    &__header {
      align-items: center;
      display: flex;
      &__info {
        margin-left: 15px;
        p {
          margin: 0;
          &:first-child {
            font-weight: 700;
          }
        }
      }
    }
    &__detail {
      padding: 15px 0;
      border-top: 1px solid #e8e8ea;
      &__total {
        border-top: 1px solid #e8e8ea;
        padding: 15px 0;
        align-items: center;
        display: flex;
        justify-content: space-between;
        span {
          &:last-child {
            font-size: 18px;
            font-weight: 700;
          }
        }
      }
      &__job {
        display: flex;
        margin-bottom: 15px;
        &__image {
          border-radius: 12px;
          width: 52px;
          height: 52px;
          overflow: hidden;
          margin-right: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        &__info {
          p {
            margin: 0;
            :first-child {
              font-weight: 700;
            }
            span {
              font-weight: 700;
            }
          }
        }
      }
    }
  }
  &__container {
    padding: 30px;
  }
  &__info {
    text-align: center;
    p {
      margin: 8px 0;
    }
    &__title {
      margin-top: 15px;
      font-weight: 700;
    }
    &__amount {
      font-size: 24px;
      font-weight: 700;
    }
  }
  &__card {
    margin-top: 30px;
    background-color: #fff;
    padding: 15px;
    border-radius: 12px;
    border: 1px solid #e8e8ea;
    &__status {
      padding: 10px 0;
      position: relative;
      &__tag {
        position: absolute;
        left: 50%;
        transform: rotate(-15deg) translateX(-50%);
        top: -5px;
        font-weight: bold;
        font-size: 13px;
        padding: 5px 12px;
        border-radius: 4px;
      }
    }
    &__info {
      border-top: 2px dashed #e8e8ea;
      padding: 10px 0;
    }
    &__action {
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      border-top: 1px solid #e8e8ea;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48%;
        padding: 8px;
        border-radius: 10px;
        color: #fff;
        span {
          position: relative;
          top: 2px;
          margin-right: 5px;
        }
        &:first-child {
          background: linear-gradient(254.81deg, #1a5aff 8.13%, #1ee9b6 92.46%);
        }
        &:last-child {
          background: #f76969;
        }
      }
    }
    &__proof {
      border-top: 1px solid #e8e8ea;
      padding: 15px 0;
      &--nofile {
        text-align: center;
        color: #f65354;
      }
      &__action {
        background: linear-gradient(254.81deg, #1a5aff 8.13%, #1ee9b6 92.46%);
        border-radius: 10px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        > span {
          margin-right: 10px;
        }
      }
      &__title {
        font-weight: 700;
      }
      &__file {
        display: flex;
        align-items: center;
        img {
          width: 32px;
          height: 32px;
        }
        &__preview {
          width: 40px;
        }
        &__info {
          flex: 1;
          font-size: 13px;
          p {
            margin: 0;
            &:first-child {
              color: #55adff;
            }
            &:last-child {
              color: #a5a3a9;
            }
          }
        }
        &__action {
          a {
            display: inline-block;
            margin-right: 10px;
          }
        }
      }
    }
  }
  table {
    width: 100%;
    margin: 0;
    border-spacing: 10px 0;
    tr {
      td {
        padding: 5px 0;
        &:first-child {
          color: #77757f;
        }
        &:last-child {
          text-align: right;
          font-weight: 700;
        }
      }
    }
  }
}

.payment-drawer {
  .ant-drawer-body {
    background-color: #f9f9f9;
  }
}

.payment-row-menu-popover {
  .ant-popover-inner-content {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
    width: 209px !important;
  }

  .payment-row-item {
    padding: 5px 0;
    cursor: pointer;

    &:hover {
      color: @color-primary;
      svg > path {
        stroke: @color-primary;
        fill: @color-grey-12;
      }
    }
  }

  .payment-row-item-canceled {
    padding: 5px 0;
    color: #f53e3e;
    cursor: pointer;
  }

  .ant-divider-horizontal {
    margin: 10px 0 !important;
  }
}
.drawer-submit-proposal__action a:last-child, .drawer-complete-job__action a:last-child {
  margin-left: 30px;
  background: linear-gradient(254.81deg, #1a5aff 8.13%, #1ee9b6 92.46%);
  padding: 10px 15px;
  border-radius: 12px;
  color: white;
  display: inline-flex;
  align-items: center;
}
.drawer-submit-proposal__action, .drawer-complete-job__action {
  padding: 30px;
  border-top: 1px solid #e8e8ea;
}
.submit-order .drawer-submit-proposal__action {
  padding: 0;
  padding-top: 30px;
}
.drawer-submit-proposal__action > div, .drawer-complete-job__action > div {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.loading-panel {
  display: flex;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
}
.menu-notification-popover .ant-popover-inner-content {
  padding: 20px!important;
}
.menu-notification-popover .ant-popover-inner {
  background: #FFFFFF;
  box-shadow: 0px 4px 56px rgba(0, 0, 0, 0.08), 0px 12px 16px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
}
`;

export default GlobalStyles;
