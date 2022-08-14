import { all, call, put, takeEvery } from "redux-saga/effects";

import actions from "./actions";
import { paginationData } from "@api/action";
import { verifyUserEmail } from "../../api/user";

const ROUTE_NAME = "admin/users";

function* loadData({ payload }) {
  try {
    const { page, limit, search } = payload;
    const { type, column, order } = payload;

    const { result, data } = yield call(
      paginationData,
      ROUTE_NAME,
      page,
      limit,
      search,
      column,
      order
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

function* loadDataMore({ payload }) {
  try {
    const { page, limit, search } = payload;
    const { column, order } = payload;
    const { result, data } = yield call(
      paginationData,
      ROUTE_NAME,
      page,
      limit,
      search,
      column,
      order
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

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_DATA, loadData),
    takeEvery(actions.LOAD_DATA_MORE, loadDataMore),
    takeEvery(actions.VERIFY_EMAIL, verifyUserEmail),
    // takeEvery(actions.RESET_DATA, resetData),
  ]);
}
