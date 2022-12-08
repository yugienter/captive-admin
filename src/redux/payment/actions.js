const DOCUMENT = "PAYMENT_";

const actions = {
  LOAD_DATA: DOCUMENT + "LOAD_DATA",
  LOAD_DATA_SUCCESS: DOCUMENT + "LOAD_DATA_SUCCESS",
  LOAD_DATA_ERROR: DOCUMENT + "LOAD_DATA_ERROR",

  LOAD_DATA_MORE: DOCUMENT + "LOAD_DATA_MORE",
  LOAD_DATA_MORE_SUCCESS: DOCUMENT + "LOAD_DATA_MORE_SUCCESS",
  LOAD_DATA_MORE_ERROR: DOCUMENT + "LOAD_DATA_MORE_ERROR",

  SAVE_INTO_DATA: DOCUMENT + "SAVE_INTO_DATA",
  SAVE_INTO_DATA_ERROR: DOCUMENT + "SAVE_INTO_DATA_ERROR",

  RESET_DATA: DOCUMENT + "RESET_DATA",
  RESET_DATA_ERROR: DOCUMENT + "RESET_DATA_ERROR",

  TOGGLE_HANDLE_MODAL: DOCUMENT + "TOGGLE_HANDLE_MODAL",
  DATA_UPDATE: DOCUMENT + "DATA_UPDATE",

  SELECTED_PAYMENT_UPDATE: DOCUMENT + "SELECTED_PAYMENT_UPDATE",
  SELECTED_ORDER_UPDATE: DOCUMENT + "SELECTED_ORDER_UPDATE",

  REJECT_ITEMS_UPDATE: DOCUMENT + "REJECT_ITEMS_UPDATE",
  APPROVE_ITEMS_UPDATE: DOCUMENT + "APPROVE_ITEMS_UPDATE",
  CHANGE_STATUS_ITEM: DOCUMENT + "CHANGE_STATUS_ITEM",
  CHANGE_STATUS_ORDER_ITEM: DOCUMENT + "CHANGE_STATUS_ORDER_ITEM",
  LOAD_COUNT_DATA: DOCUMENT + "LOAD_COUNT_DATA",
  LOAD_COUNT_DATA_COMPLETE: DOCUMENT + "LOAD_COUNT_DATA_COMPLETE",
  SELECT_PAYMENT_DETAIL: DOCUMENT + "SELECT_PAYMENT_DETAIL",

  loadData: (data) => {
    return { type: actions.LOAD_DATA, payload: data };
  },

  setSelectedPayment: (show) => {
    return { type: actions.SELECT_PAYMENT_DETAIL, payload: show };
  },

  loadDataSuccess: (data) => ({
    type: actions.LOAD_DATA_SUCCESS,
    payload: { data },
  }),

  loadDataError: (error) => ({
    type: actions.LOAD_DATA_ERROR,
    payload: { error },
  }),

  loadDataMore: (data) => {
    return { type: actions.LOAD_DATA_MORE, payload: data };
  },

  loadDataMoreSuccess: (data) => ({
    type: actions.LOAD_DATA_MORE_SUCCESS,
    payload: { data },
  }),

  loadDataMoreError: (error) => ({
    type: actions.LOAD_DATA_MORE_ERROR,
    payload: { error },
  }),

  saveData: (data, actionName = "insert") => ({
    type: actions.SAVE_INTO_DATA,
    payload: { data, actionName },
  }),

  toggleModal: (data = null) => ({
    type: actions.TOGGLE_HANDLE_MODAL,
    payload: { data },
  }),

  update: (data) => ({
    type: actions.DATA_UPDATE,
    payload: { data },
  }),

  saveDataError: (error) => ({
    type: actions.SAVE_INTO_DATA_ERROR,
    payload: { error },
  }),

  resetData: () => ({
    type: actions.RESET_DATA,
  }),

  resetDataError: (error) => ({
    type: actions.RESET_DATA_ERROR,
    payload: { error },
  }),

  selectedPaymentUpdate: (data) => ({
    type: actions.SELECTED_PAYMENT_UPDATE,
    payload: { data },
  }),

  selectedOrderUpdate: (data) => ({
    type: actions.SELECTED_ORDER_UPDATE,
    payload: { data },
  }),

  rejectItemsUpdate: (data) => ({
    type: actions.REJECT_ITEMS_UPDATE,
    payload: { data },
  }),

  approveItemsUpdate: (data) => ({
    type: actions.APPROVE_ITEMS_UPDATE,
    payload: { data },
  }),

  changeStatusItem: (code, status) => ({
    type: actions.CHANGE_STATUS_ITEM,
    payload: { code, status },
  }),

  changeStatusOrderItem: (code, status) => ({
    type: actions.CHANGE_STATUS_ORDER_ITEM,
    payload: { code, status },
  }),

  loadCountData: (data) => ({
    type: actions.LOAD_COUNT_DATA,
    payload: { data },
  }),

  loadCountDataComplete: (data) => ({
    type: actions.LOAD_COUNT_DATA_COMPLETE,
    payload: { data },
  }),
};
export default actions;
