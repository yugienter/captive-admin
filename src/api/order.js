import SuperFetch from "./action";

export const updateOrderStatus = async (orderCode, status, reason) => {
  return await SuperFetch.put(`admin/orders/${orderCode}`, {
    status,
    reason,
  });
};