const DOCUMENT = "USER_";

const actions = {
  LOAD_DATA: DOCUMENT + "LOAD_DATA",
  LOAD_DATA_SUCCESS: DOCUMENT + "LOAD_DATA_SUCCESS",
  LOAD_DATA_ERROR: DOCUMENT + "LOAD_DATA_ERROR",

  LOAD_DATA_MORE: DOCUMENT + "LOAD_DATA_MORE",
  LOAD_DATA_MORE_SUCCESS: DOCUMENT + "LOAD_DATA_MORE_SUCCESS",
  LOAD_DATA_MORE_ERROR: DOCUMENT + "LOAD_DATA_MORE_ERROR",

  RESET_DATA: DOCUMENT + "RESET_DATA",
  RESET_DATA_ERROR: DOCUMENT + "RESET_DATA_ERROR",

  VERIFY_EMAIL: DOCUMENT + "VERIFY_EMAIL",

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

  verifyUserEmail: (code) => ({
    type: actions.VERIFY_EMAIL,
    payload: { code },
  }),
};
export default actions;
