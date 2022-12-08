import SuperFetch from "../../api/action";
import * as types from "./actionTypes";

const route = {
  notificationTotal: "notifications/unclicked",
  notificationData: (group, limit, page) => `notifications?group=${group}&limit=${limit}&page=${page}`,
  notificationClick: (notificationId) => `notifications/${notificationId}/click`,
}
export const changeTab = (tab) => async (dispatch) => {
  dispatch({ type: types.UPDATE_TAB, payload: tab });
}

export const getNotificationTotal = () => async (dispatch) => {
  const res = await SuperFetch.get(route.notificationTotal);
  const data = res.data;
  dispatch({ type: types.UPDATE_TOTAL, payload: data });
}

export const getNotificationData = (group, limit, page) => async (dispatch) => {
  const res = await SuperFetch.get(route.notificationData(group, limit, page));
  const data = res.data;
  if (page === 1) {
    dispatch({ type: types.UPDATE_DATA, payload: data });
    return;
  }
  dispatch({ type: types.UPDATE_MORE_DATA, payload: data });
}

export const notificationClick = async (notificationId) => {
  const res = await SuperFetch.post(route.notificationClick(notificationId));
  const data = res.data.data;
  return data;
}

export const changePage = (page) => (dispatch) => {
  dispatch({ type: types.UPDATE_PAGE, payload: page });
}

export const changeVisibleNotification = (show) => (dispatch) => {
  dispatch({ type: types.CHANGE_VISIBLE_NOTIFICATION, payload: show });
}