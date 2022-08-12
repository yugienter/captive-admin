import actions from "./actions";

const initState = {
  isLoading: false,
  errorMessage: false,
  data: {
    data: [],
    total: 0,
    page: 1,
    perPage: 10,
    lastPage: 1,
  },
  page: 1,
  limit: 10,
  search: "",
  modalActive: false,
  record: {},
  selectedPayment: [],
  selectedOrder: [],
  selectedApprove: [],
  selectedReject: [],
  hostInfo: false,
  totalInfo: {
    totalOrder: 184,
    totalCommission: 3040,
    totalFixedRate: 1800,
    totalPlatformFee: 440.80,
    totalAmount: 4399.20,
  }
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
    case actions.LOAD_DATA:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
      };
    case actions.LOAD_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload.data,
        page: parseInt(payload.data.page),
        errorMessage: false,
      };
    case actions.LOAD_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: "There is a loading problem",
      };
    case actions.TOGGLE_HANDLE_MODAL:
      return {
        ...state,
        modalActive: !state.modalActive,
        record: payload.data ?? initState.data,
      };
    case actions.DATA_UPDATE:
      return {
        ...state,
        record: payload.data,
      };
    case actions.SELECTED_PAYMENT_UPDATE:
      return {
        ...state,
        selectedPayment: payload.data,
      };
    case actions.SELECTED_ORDER_UPDATE:
      return {
        ...state,
        selectedOrder: payload.data,
      };
    case actions.APPROVE_ITEMS_UPDATE:
      return {
        ...state,
        selectedApprove: payload.data,
      };
    case actions.REJECT_ITEMS_UPDATE:
      return {
        ...state,
        selectedReject: payload.data,
      };
    case actions.UPDATE_HOST_DATA:
      return {
        ...state,
        hostInfo: payload.data,
      };
    default:
      return state;
  }
}
