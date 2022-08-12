import SuperFetch from "./action";

export const updatePaymentStatus = async (paymentCode, status) => {
  return await SuperFetch.put(`admin/payments/${paymentCode}`, {
    status,
  });
};

export const paymentCount = async () => {
  return await SuperFetch.get(`admin/payments/count`);
};

export const paymentCodePrefix = (payment) => {
  if (payment.receive === "scx" && payment.source === "host") return "PO";
  if (payment.receive === "scx" && payment.source === "company") return "PF";
  if (payment.receive === "company" && payment.source === "scx") return "RM";
  if (payment.receive === "host" && payment.source === "scx") return "RM";
  return "RM";
};

export const paymentTypeText = (payment) => {
  let text = "";
  if (payment.receive === "scx" && payment.source === "host") text = "Order Submission";
  if (payment.receive === "scx" && payment.source === "company") text = "Fixed Rate";
  if (payment.receive === "company" && payment.source === "scx") text = "Release Order Money";
  if (payment.receive === "host" && payment.source === "scx") text = "Release Fixed Rate";
  return text;
}

export const hostPaymentStatistic = async (hostCode, jobCode) => {
  return await SuperFetch.get(`admin/payments/statistic/${hostCode}/${jobCode}`);
}

export const updatePaymentProof = async (paymentCode, proof) => {
  return await SuperFetch.put(`admin/payments/update-proof/${paymentCode}`, {
    proof,
  });
};