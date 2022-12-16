export const API_URL = process.env.REACT_APP_API_URL;

const customHeader = () => ({
	"Content-Type": "application/json",
	Accept: "application/json",
	Authorization: "Bearer " + localStorage.getItem("id_token") || undefined,
});
const customHeaderXls = () => ({
	"Content-Type":
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	Accept: "application/content-type",
	Authorization: "Bearer " + localStorage.getItem("id_token") || undefined,
});

const base = (method, url, data = {}, headers = false) => {
	try {
		const metaData = {
			method,
			headers: customHeader(),
		};
		if (headers) {
			metaData.headers = headers;
		}
		if (["post", "put", "patch"].includes(method)) {
			metaData.body = JSON.stringify(data);
		}
		return fetch(`${API_URL}api/${url}`, metaData)
			.then(async (response) => {
				return {
					result: [200, 201].includes(response.status),
					data: await response.json(),
				};
			})
			.then((res) => res);
	} catch (error) {
		console.log("error", error);
		if (error.response) {
			return {
				result: false,
				data: error.response?.data,
			};
		}
		return {
			result: false,
			data: false,
		};
	}
};

const SuperFetch = {};
["get", "post", "put", "patch", "delete"].forEach((method) => {
	SuperFetch[method] = base.bind(null, method);
});

export const paginationData = async (
	route,
	page,
	limit,
	search,
	column,
	order,
	custom = "",
) => {
	return await SuperFetch.get(
		`${route}?per_page=${limit}&page=${page}&search=${search}&column=${
			column ?? ""
		}&order=${order ?? ""}${custom}`,
	);
};

export const checkAuthentication = async () => {
	return await SuperFetch.get(`auth/token`);
};

export const mediaUrl = (media) => {
	return `${API_URL}api/media/${encodeURIComponent(media)}`;
};

export const xlsx = (route) => {
	const metaData = {
		method: "get",
		headers: customHeaderXls(),
	};
	return fetch(`${API_URL}api/${route}`, metaData);
};

export default SuperFetch;
