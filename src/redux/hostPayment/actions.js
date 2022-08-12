const DOCUMENT = "HOST_PAYMENT_";

const actions = {
  LOAD_DATA: DOCUMENT + "LOAD_DATA",
  LOAD_DATA_SUCCESS: DOCUMENT + "LOAD_DATA_SUCCESS",
  LOAD_DATA_ERROR: DOCUMENT + "LOAD_DATA_ERROR",

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

  UPDATE_HOST_DATA: DOCUMENT + "UPDATE_HOST_DATA",

  loadData: (data) => {
    return { type: actions.LOAD_DATA, payload: data };
  },

  loadDataSuccess: (data) => ({
    type: actions.LOAD_DATA_SUCCESS,
    payload: { data },
  }),

  loadDataError: (error) => ({
    type: actions.LOAD_DATA_ERROR,
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

  updateHostData: (data) => ({
    type: actions.UPDATE_HOST_DATA,
    payload: { data },
  }),
};
export default actions;
