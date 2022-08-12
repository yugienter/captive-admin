import { all, call, put, takeEvery } from 'redux-saga/effects';

import actions from './actions';
import { paginationData } from "@api/action";

const ROUTE_NAME = 'admin/direct-offers';

function* loadData({ payload }) {
  try {
    const { page, limit, search } = payload;
    const { result, data } = yield call(paginationData, ROUTE_NAME, page, limit, search);
    if (result) {
      yield put(actions.loadDataSuccess(data));
      return;
    };
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
