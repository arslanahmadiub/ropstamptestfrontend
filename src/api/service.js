/* eslint-disable no-undef */
import axios from "axios";

export const apiBase = () => {
  if (!import.meta.env.VITE_REACT_APP_API_ENDPOINT) {
    throw new Error("API ENDPOINT NOT SET!");
  }

  return import.meta.env.VITE_REACT_APP_API_ENDPOINT;
};

export const sendRQApiJson = async (method, urlPath, at, bodyData) => {
  const headers = {};

  if (method !== "GET" && method !== "DELETE") {
    headers["Content-Type"] = "application/json";
  }

  if (at) {
    headers["Authorization"] = `${at}`;
  }

  const config = {
    method,
    url: `${apiBase()}${urlPath}`,
    headers,
    data: bodyData,
  };

  console.log(`[**net-rq**] Starting ${method} ${urlPath} -- ${apiBase()} `);
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log('error', error)
    if (error.response && error.response.data && error.response.data.error) {
      const { code, title, msg } = error.response.data.error;
      throw new APIError(code, title, msg);
    }
    throw new Error("Network error");
  }
};
