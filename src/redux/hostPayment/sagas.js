import { all, put, takeEvery } from 'redux-saga/effects';

import actions from './actions';

function* loadData({ payload }) {
  try {
    const data = {
      data: [
        {
          code: "PO10004",
          product: {
            name: "Product 1",
          },
          host: {
            name: "Jerome Bell",
            avatar: "./media/1636085619230.jpeg",
            email: "caohuuvulam@gmail.com",
          },
          jobName: "Black Chicken Mushroom Soup",
          jobStatus: "ordering", // Ordering, Ended, Ready to release money, Complete
          createdAt: "2021-11-16T03:33:21.496Z",
          total: 1658,
          receive: "scx",
          status: "pending",
          proof: [{
            name: "TransferCapture_BC-001.jpg",
            createdAt: "2021-11-16T03:33:21.496Z",
          }],
          productPublicRRP: 50,
          productAmount: 45,
          commission: 10,
          commissionUnit: "USD",
          platformFee: 25,
          productTotal: 2000,
          orders: [
            {
              code: "A000001",
              sku: "Soup-VNE-L-White",
              quantity: 1,
              status: "submitted",
              consumerName: "Consumer Full Name",
              contactNumber: "+001 0123 456 789",
              deliveryAddress: "31A Wall Street, Salt Lake CA, 1123",
              createdAt: "2021-11-16T03:33:21.496Z",
              reason: "",
            },
            {
              code: "A000002",
              sku: "Soup-VNE-L-White",
              quantity: 2,
              status: "submitted",
              consumerName: "Consumer Full Name",
              contactNumber: "+001 0123 456 789",
              deliveryAddress: "31A Wall Street, Salt Lake CA, 1123",
              createdAt: "2021-11-16T03:33:21.496Z",
              reason: "",
            },
            {
              code: "A000003",
              sku: "Soup-VNE-L-White",
              quantity: 3,
              status: "submitted",
              consumerName: "Consumer Full Name",
              contactNumber: "+001 0123 456 789",
              deliveryAddress: "31A Wall Street, Salt Lake CA, 1123",
              createdAt: "2021-11-16T03:33:21.496Z",
              reason: "",
            },
          ]
        },
        {
          code: "PO10005",
          product: {
            name: "Product 1",
          },
          host: {
            name: "Jerome Bell",
            avatar: "./media/1636085619230.jpeg",
            email: "caohuuvulam@gmail.com",
          },
          jobName: "Black Chicken Mushroom Soup",
          jobStatus: "ordering", // Ordering, Ended, Ready to release money, Complete
          createdAt: "2021-11-16T03:33:21.496Z",
          total: 1258,
          status: "pending",
          receive: "scx",
          proof: "",
          orders: [
            {
              code: "A000004",
              sku: "Soup-VNE-L-White",
              quantity: 1,
              status: "submitted",
              consumerName: "Consumer Full Name",
              contactNumber: "+001 0123 456 789",
              deliveryAddress: "31A Wall Street, Salt Lake CA, 1123",
              createdAt: "2021-11-16T03:33:21.496Z",
              reason: "",
            },
            {
              code: "A000005",
              sku: "Soup-VNE-L-White",
              quantity: 1,
              status: "submitted",
              consumerName: "Consumer Full Name",
              contactNumber: "+001 0123 456 789",
              deliveryAddress: "31A Wall Street, Salt Lake CA, 1123",
              createdAt: "2021-11-16T03:33:21.496Z",
              reason: "",
            },
          ]
        }
      ],
      total: 0,
      page: 1,
      perPage: 10,
      lastPage: 1,
    };
    yield put(actions.loadDataSuccess(data));
    return;
  } catch (error) {
    console.log(error);
    yield put(actions.loadDataError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_DATA, loadData),
    // takeEvery(actions.SAVE_INTO_DATA, storeData),
    // takeEvery(actions.RESET_DATA, resetData),
  ]);
}
