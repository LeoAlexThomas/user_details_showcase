import { getApiUrl } from "@/env";
const axios = require("axios");

const api = (route: string, options?: any) => {
  const combinedOptions = Object.assign({}, options);

  const apiBaseUrl = getApiUrl();
  return axios({
    url: apiBaseUrl + route,
    ...combinedOptions,
    transformResponse: (res: any, headers: Record<string, string>) => {
      if (!Boolean(res)) {
        return null;
      }
      if (headers["content-type"].startsWith("application/json")) {
        return JSON.parse(res);
      }
      return res;
    },
  }).then((res: any) => {
    return res.data;
  });
};
export default api;
