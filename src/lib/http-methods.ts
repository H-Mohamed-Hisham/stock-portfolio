import axios from "axios";

export async function default_headers() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export async function get_request(
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

export async function post_request(
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

export async function put_request(
  url = "",
  data = {},
  headers = {
    "Content-Type": "application/json",
  }
) {
  const response = await axios({
    method: "PUT",
    data,
    url,
    headers,
  });

  return response;
}

export async function delete_request(
  url = "",
  data = {},
  headers = {
    "Content-Type": "application/json",
  }
) {
  const response = await axios({
    method: "DELETE",
    data,
    url,
    headers,
  });

  return response;
}
