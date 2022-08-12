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
  count: {},
  page: 1,
  limit: 10,
  search: "",
  modalActive: false,
  record: false,
  selectedPayment: [],
  selectedOrder: [],
  selectedApprove: [],
  selectedReject: [],
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
      case actions.LOAD_DATA_MORE:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
      };
    case actions.LOAD_DATA_MORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          data: [...state.data.data, ...payload.data.data],
        },
        page: parseInt(payload.data.page),
        errorMessage: false,
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
    case actions.CHANGE_STATUS_ITEM:
      const index = state.data.data.findIndex(
        (item) => item.code === payload.code
      );
      state.data.data[index].status = payload.status;
      return {
        ...state,
        data: { ...state.data },
      };
      case actions.CHANGE_STATUS_ORDER_ITEM:
        for (let i = 0; i < state.data.data.length; i++) {
          const orders = state.data.data[i].orders;
          for (let j = 0; j < orders.length; j++) {
            if (orders[j].code === payload.code) {
              state.data.data[i].orders[j].status = payload.status;
              state.data.data[i].orders[j].reason = payload.reason;
            }
          }
        }
        return {
          ...state,
          data: { ...state.data },
        };
    case actions.LOAD_COUNT_DATA_COMPLETE:
      return {
        ...state,
        count: payload.data,
      };
    default:
      return state;
  }
}
