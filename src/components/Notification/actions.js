import * as types from "./actionTypes";

export const changeTab = (tab) => async (dispatch) => {
  dispatch({ type: types.UPDATE_TAB, payload: tab });
}

export const getNotificationTotal = () => async (dispatch) => {
  // const res = await client.request({
  //   path: api.path.getNotificationTotal,
  //   method: "get",
  // });
  // const data = res.data;
  // dispatch({ type: types.UPDATE_TOTAL, payload: data });
}

export const getNotificationData = (group, limit, skip) => async (dispatch) => {
  // const res = await client.request({
  //   path: api.path.getNotificationData(group, limit, skip),
  //   method: "get",
  // });
  // const data = res.data;
  // if (skip === 0) {
    // dispatch({ type: types.UPDATE_DATA, payload: data });
    // return;
  // }
  // dispatch({ type: types.UPDATE_MORE_DATA, payload: data });
}

export const notificationClick = async (notificationId) => {
  // const res = await client.request({
  //   path: api.path.notificationClick(notificationId),
  //   method: "put",
  // });
  // const data = res.data.data;
  // return data;
}

export const changePage = (page) => (dispatch) => {
  dispatch({ type: types.UPDATE_PAGE, payload: page });
}