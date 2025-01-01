import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const { apiUrl } = publicRuntimeConfig;

const getApiUrl = () => {
  if (!apiUrl) {
    return;
  }
  return apiUrl;
};

export { getApiUrl };
