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
  record: {
    key: null,
    id: new Date().getTime(),
    media: [],
    categories: [],
    gender: [],
    status: "0",
    code: "",
    brandName: "",
    story: "",
    manufacturerCountry: "",
    manufacturerName: "",
    productBenefits: "",
    name: "",
    currency: "USD",
    weightUnit: "",
    companyCode: "",
    createdAt: new Date().getTime(),
    updatedAt: null,
  },
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
    default:
      return state;
  }
}
