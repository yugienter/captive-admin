import { all } from "redux-saga/effects";
import authSagas from "@iso/redux/auth/saga";
import campaignSaga from "@iso/redux/campaign/sagas";
import companySaga from "@iso/redux/company/sagas";
import directOfferSaga from "@iso/redux/directOffer/sagas";
import hostPaymentSaga from "@iso/redux/hostPayment/sagas";
import hostSaga from "@iso/redux/host/sagas";
import invoicesSagas from "@iso/redux/invoice/saga";
import paymentJobSaga from "@iso/redux/paymentJob/sagas";
import paymentSaga from "@iso/redux/payment/sagas";
import productSaga from "@iso/redux/product/sagas";
import profileSaga from "@iso/redux/profile/saga";
import usersSaga from "@iso/redux/users/sagas";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    invoicesSagas(),
    profileSaga(),
    companySaga(),
    hostSaga(),
    productSaga(),
    campaignSaga(),
    directOfferSaga(),
    paymentSaga(),
    paymentJobSaga(),
    hostPaymentSaga(),
    usersSaga(),
  ]);
}
