import { defaultHeaders, getRequest, postRequest } from "@/lib/http-method";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export const fetchTop3StockInvested = async ({ queryKey }: any) => {
  // Handle the case where the domain is not available yet
  if (!apiDomain) {
    return [];
  }

  if (queryKey.length === 1) queryKey.push({});

  const [key, body] = queryKey;

  const { data } = await getRequest(
    `${apiDomain}/chart/top-invested`,
    body,
    await defaultHeaders()
  );

  return data;
};

export const fetchTop3StockProfit = async ({ queryKey }: any) => {
  // Handle the case where the domain is not available yet
  if (!apiDomain) {
    return [];
  }

  if (queryKey.length === 1) queryKey.push({});

  const [key, body] = queryKey;

  const { data } = await getRequest(
    `${apiDomain}/chart/top-profit`,
    body,
    await defaultHeaders()
  );

  return data;
};
