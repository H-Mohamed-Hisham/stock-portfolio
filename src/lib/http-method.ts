import axios from "axios";

export async function defaultHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export async function getRequest(
  url = "",
  queryParams = {},
  headers = {
    "Content-Type": "application/json",
  }
) {
  let baseURL = url;

  if (Object.keys(queryParams).length) {
    baseURL += `?${new URLSearchParams(queryParams).toString()}`;
  }

  const response = await axios({
    method: "GET",
    baseURL,
    headers,
  });

  return response;
}

export async function postRequest(
  url = "",
  data = {},
  headers = {
    "Content-Type": "application/json",
  }
) {
  const response = await axios({
    method: "POST",
    data,
    url,
    headers,
  });

  return response;
}
