import SuperFetch from "./action";

export const verifyUserEmail = async (params) => {
  return await SuperFetch.post(`admin/users/${params.payload.code}/verify`, {});
};
