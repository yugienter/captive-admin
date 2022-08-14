import { __esModule } from "styled-theme";
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
};

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.LOAD_DATA:
      const sorter = {
        column: payload.column || null,
        order: payload.order || "desc",
      };
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        sorter,
        page: payload.page || 1,
      };
    case actions.LOAD_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload.data,
        page: parseInt(payload.data.page) + 1,
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
    case actions.VERIFY_EMAIL:
      return {
        ...state,
        record: payload.code,
      };
    default:
      return state;
  }
}
