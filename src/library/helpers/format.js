export const formatMoney = (str) => {
  if (str === null || str === undefined || str === "") {
    return "";
  }
  let value = str;
  value = parseFloat(parseFloat(value).toFixed(2));
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const objectToQueryString = (obj) => {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
};