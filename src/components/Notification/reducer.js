import * as types from "./actionTypes";

const initialState = {
  isLoading: false,
  showNotification: false,
  tab: "all",
  notificationPage: 1,
  total: {
    totalUnclicked: 0,
    groups: {
      chats: 0,
      system: 0,
      orderNPayment: 0,
      pitchProposal: 0,
    },
  },
  notifications: {
    total: 0,
    totalUnclicked: 0,
    new: {
      total: 0,
      totalUnclicked: 0,
      notifications: [],
    },
    earlier: {
      total: 0,
      totalUnclicked: 0,
      notifications: [],
    },
  },
  pagination: {
    page: 1,
    perPage: 10,
    total: null,
    lastPage: null,
  },
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.UPDATE_LOADING:
      return {
        ...state,
        isLoading: !!payload,
      };

    case types.UPDATE_DATA: {
      return {
        ...state,
        notifications: payload,
      };
    }

    case types.UPDATE_PAGE: {
      return {
        ...state,
        notificationPage: payload,
      };
    }

    case types.UPDATE_TOTAL: {
      return {
        ...state,
        total: {
          totalUnclicked: payload?.totalUnclicked ?? 0,
          groups: {
            chats: payload?.groups?.chat ?? 0,
            system: payload?.groups?.system ?? 0,
            orderNPayment: payload?.groups?.orderNPayment ?? 0,
            pitchProposal:payload?.groups?.pitchProposal ?? 0,
          },
        },
      };
    }

    case types.UPDATE_TAB: {
      return {
        ...state,
        tab: payload,
      };
    }

    case types.UPDATE_MORE_DATA: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          new: {
            total: state.notifications.new.total + payload.new.total,
            totalUnclicked: state.notifications.new.totalUnclicked + payload.new.totalUnclicked,
            notifications: [...state.notifications.new.notifications, ...payload.new.notifications],
          },
          earlier: {
            total: state.notifications.earlier.total + payload.earlier.total,
            totalUnclicked: state.notifications.earlier.totalUnclicked + payload.earlier.totalUnclicked,
            notifications: [...state.notifications.earlier.notifications, ...payload.earlier.notifications],
          },
        },
      };
    }

    case types.UPDATE_PAGINATION: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          payload,
        },
      };
    }

    case types.CHANGE_VISIBLE_NOTIFICATION: {
      return {
        ...state,
        showNotification: payload,
      };
    }
    default:
      return state;
  }
};

export default notificationReducer;
