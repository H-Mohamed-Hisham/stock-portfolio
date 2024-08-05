import dayjs from "dayjs";

export const formatDate = (date: string) => {
  if (date === "current_date") {
    return dayjs().format("YYYY-MM-DD");
  }

  const result = dayjs(date).format("YYYY-MM-DD");
  return result;
};

export const formatNumber = (number = 0) => {
  const result = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

  return result;
};
