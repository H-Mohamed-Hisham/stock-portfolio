import dayjs from "dayjs";

// Types
import { TFormatNumberParams } from "@/types";

export const formatDate = (date: string) => {
  const result = dayjs(date).format("DD-MMM-YYYY");
  return result;
};

export const formatDateToISO = (date: string) => {
  const result = dayjs(date).toISOString();
  return result;
};

export const formatNumber = ({
  value = 0,
  show_rupee_symbol = false,
}: TFormatNumberParams): string => {
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return show_rupee_symbol ? `₹${formattedNumber}` : formattedNumber;
};
