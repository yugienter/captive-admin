import SuperFetch from "./action";

export const getCampaignData = async (search) => {
  return await SuperFetch.get(`?per_page=10&page=1&search=${search}`);
};
