const DOCUMENT = "PAYMENT_JOB_";

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
};
export default actions;
