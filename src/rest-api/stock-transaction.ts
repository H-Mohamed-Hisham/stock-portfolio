import { defaultHeaders, getRequest, postRequest } from "@/lib/http-method";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export const fetchAllStockTransaction = async ({ queryKey }: any) => {
  // Handle the case where the domain is not available yet
  if (!apiDomain) {
    return [];
  }

  if (queryKey.length === 1) queryKey.push({});

  const [key, body] = queryKey;

  const { data } = await getRequest(
    `${apiDomain}/transaction/stock`,
    body,
    await defaultHeaders()
  );

  return data;
};

export const fetchAllStockHolding = async ({ queryKey }: any) => {
  // Handle the case where the domain is not available yet
  if (!apiDomain) {
    return [];
  }

  if (queryKey.length === 1) queryKey.push({});

  const [key, body] = queryKey;

  const { data } = await getRequest(
    `${apiDomain}/transaction/stock/holding`,
    body,
    await defaultHeaders()
  );

  return data;
};

export const fetchAllStockProfitLoss = async ({ queryKey }: any) => {
  // Handle the case where the domain is not available yet
  if (!apiDomain) {
    return [];
  }

  if (queryKey.length === 1) queryKey.push({});

  const [key, body] = queryKey;

  const { data } = await getRequest(
    `${apiDomain}/transaction/stock/profit-loss`,
    body,
    await defaultHeaders()
  );

  return data;
};

export const addStockTransaction = async (queryKey: any) => {
  // Handle the case where the domain is not available yet
  if (!apiDomain) {
    return null;
  }

  if (queryKey.length === 1) queryKey.push({});

  const [key, body] = queryKey;

  const { data } = await postRequest(
    `${apiDomain}/transaction/stock`,
    body,
    await defaultHeaders()
  );

  return data;
};
