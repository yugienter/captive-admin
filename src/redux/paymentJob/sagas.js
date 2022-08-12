import { all, call, put, takeEvery } from "redux-saga/effects";

import actions from "./actions";
import { objectToQueryString } from "../../library/helpers/format";
import { paginationData } from "@api/action";

const ROUTE_NAME = "admin/orders/job-list";

function* loadData({ payload }) {
  try {
    const { page, limit, search } = payload;
    const { jobCode, hostCode, column, order, dealOrderStatus } = payload;
    const filter = {
      jobCode: jobCode ?? "",
      hostCode: hostCode ?? "",
      dealOrderStatus: dealOrderStatus ?? "",
    };
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
      return;
    }
    yield put(actions.loadDataError(data));
  } catch (error) {
    console.log(error);
    yield put(actions.loadDataError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_DATA, loadData),
    // takeEvery(actions.SAVE_INTO_DATA, storeData),
    // takeEvery(actions.RESET_DATA, resetData),
  ]);
}
