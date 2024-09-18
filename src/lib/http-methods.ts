import axios, { isAxiosError } from "axios";

// Constants
import { LOCAL_STORAGE_KEY } from "@/constants/miscellaneous";

export async function default_headers() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}`,
  };
}

export async function get_request(
  url = "",
  queryParams = {},
  headers = {
    "Content-Type": "application/json",
  }
) {
  try {
    let baseURL = url;

    if (Object.keys(queryParams).length) {
      baseURL += `?${new URLSearchParams(queryParams).toString()}`;
    }

    const response = await axios({
      method: "GET",
      baseURL,
      headers,
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
}

export async function post_request(
  url = "",
  data = {},
  headers = {
    "Content-Type": "application/json",
  }
) {
  try {
    const response = await axios({
      method: "POST",
      data,
      url,
      headers,
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
}

export async function patch_request(
  url = "",
  data = {},
  headers = {
    "Content-Type": "application/json",
  }
) {
  try {
    const response = await axios({
      method: "PATCH",
      data,
      url,
      headers,
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
}

export async function delete_request(
  url = "",
  data = {},
  headers = {
    "Content-Type": "application/json",
  }
) {
  try {
    const response = await axios({
      method: "DELETE",
      data,
      url,
      headers,
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
}
