import { all, call, put, takeEvery } from "redux-saga/effects";

import actions from "./actions";
import { objectToQueryString } from "../../library/helpers/format";
import { paginationData } from "@api/action";
import { paymentCount } from "../../api/payment";

const ROUTE_NAME = "admin/payments";

function* loadData({ payload }) {
  try {
    const { page, limit, search, status, jobCode, hostCode } = payload;
    const { type, column, order, receive, source, fromDate, toDate } = payload;
    const filter = {
      status: status ?? "",
      jobCode: jobCode ?? "",
      hostCode: hostCode ?? "",
      type: type ?? "",
      receive: receive ?? "",
      source: source ?? "",
    }
    if (fromDate && toDate) {
      filter.fromDate = fromDate;
      filter.toDate = toDate;
    }
    const customQuery = `&${objectToQueryString(filter)}`;
    const { result, data } = yield call(
      paginationData,
      ROUTE_NAME,
      page,
      limit,
      search,
      column,
      order,
      customQuery
    );
    if (result) {
      yield put(actions.loadDataSuccess(data));
      return data;
    }
    yield put(actions.loadDataError(data));
  } catch (error) {
    console.log(error);
    yield put(actions.loadDataError(error));
  }
}

function* loadDataMore({ payload }) {
  try {
    const { page, limit, search, status, jobCode, hostCode } = payload;
    const { type, column, order, receive } = payload;
    const filter = {
      status: status ?? "",
      jobCode: jobCode ?? "",
      hostCode: hostCode ?? "",
      type: type ?? "",
      receive: receive ?? "",
    }
    const customQuery = `&${objectToQueryString(filter)}`;
    const { result, data } = yield call(
      paginationData,
      ROUTE_NAME,
      page,
      limit,
      search,
      column,
      order,
      customQuery
    );
    if (result) {
      yield put(actions.loadDataMoreSuccess(data));
      return;
    }
    yield put(actions.loadDataMoreError(data));
  } catch (error) {
    console.log(error);
    yield put(actions.loadDataMoreError(error));
  }
}

function* loadCountData() {
  try {
    const { result, data } = yield call(paymentCount);
    if (result) {
      yield put(actions.loadCountDataComplete(data));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_DATA, loadData),
    takeEvery(actions.LOAD_DATA_MORE, loadDataMore),
    takeEvery(actions.LOAD_COUNT_DATA, loadCountData),
    // takeEvery(actions.SAVE_INTO_DATA, storeData),
    // takeEvery(actions.RESET_DATA, resetData),
  ]);
}
