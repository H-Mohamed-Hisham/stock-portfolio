import dayjs from "dayjs";

export const formatDate = (date: string) => {
  const result = dayjs(date).format("DD-MMM-YYYY");
  return result;
};

export const formatDateToISO = (date: string) => {
  const result = dayjs(date).toISOString();
  return result;
};

export const formatNumber = (number = 0) => {
  const result = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

  return result;
};
