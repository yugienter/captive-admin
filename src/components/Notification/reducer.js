import * as types from "./actionTypes";

const initialState = {
  isLoading: false,
  tab: "All",
  notificationPage: 1,
  total: {
    totalUnclicked: 10,
    groups: {
      chats: 4,
      system: 2,
      orderNPayment: 2,
      pitchProposal: 2,
    },
  },
  notifications: {
    total: 0,
    totalUnclicked: 0,
    new: {
      total: 2,
      totalUnclicked: 2,
      notifications: [
        {
          code: 1,
          group: "Chat",
          message: "<b>Merchant A</b> has sent you a message.",
        },
        {
          code: 2,
          group: "Chat",
          message: "<b>Merchant B</b> has sent you a message.",
        },
      ],
    },
    earlier: {
      total: 1,
      totalUnclicked: 1,
      notifications: [
        {
          code: 1,
          group: "Chat",
          message: "<b>Merchant A</b> has sent you a message.",
        },
        {
          code: 2,
          group: "OrderNPayment",
          message: "SCX has received payment and approved orders of “<b>Product A</b>” from <b>John</b>. View the orders here.",
          clickedAt: true,
        },
        {
          code: 3,
          group: "PitchProposal",
          message: "<b>John</b> has sent you a new proposal for “<b>Product A</b>”. View it here.",
          clickedAt: true,
        },
        {
          code: 4,
          group: "System",
          message: "<b>Product A</b> has a new campaign. Check it out here!",
          clickedAt: true,
        },
        {
          code: 5,
          group: "Chat",
          message: "<b>Merchant A</b> has sent you a message.",
        },
        {
          code: 6,
          group: "OrderNPayment",
          message: "SCX has received payment and approved orders of “<b>Product A</b>” from <b>John</b>. View the orders here.",
          clickedAt: true,
        },
        {
          code: 7,
          group: "PitchProposal",
          message: "<b>John</b> has sent you a new proposal for “<b>Product A</b>”. View it here.",
          clickedAt: true,
        },
        {
          code: 8,
          group: "System",
          message: "<b>Product A</b> has a new campaign. Check it out here!",
          clickedAt: true,
        },
      ],
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
        notifications: payload.data,
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
        total: payload.data,
      };
    }

    case types.UPDATE_TAB: {
      return {
        ...state,
        tab: payload,
      };
    }

    case types.UPDATE_MORE_DATA: {
      const notifications = state.notifications;
      notifications.new.notifications = [...notifications.new.notifications, payload.data.new.notifications];
      notifications.earlier.notifications = [...notifications.earlier.notifications, payload.data.earlier.notifications];
      return {
        ...state,
        notifications: {...notifications},
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
    default:
      return state;
  }
};

export default notificationReducer;
