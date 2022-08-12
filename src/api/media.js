import { API_URL } from "./action";

export const uploadMedia = async (formData) => {
  const customHeader = () => ({
    Authorization: "Bearer " + localStorage.getItem("id_token") || undefined,
  });
  return await fetch(`${API_URL}api/admin/upload`, {
    method: "POST",
    body: formData,
    headers: customHeader(),
  }).then(res => res.json());
};
