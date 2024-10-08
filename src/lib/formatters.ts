import dayjs from "dayjs";

// Types
import { TFormatNumber, TFormatDate } from "@/types";

export const formatDate = ({ date }: TFormatDate): string => {
  const result = dayjs(date).format("DD-MMM-YYYY");
  return result;
};

export const formatDateToISO = ({ date }: TFormatDate): string => {
  const result = dayjs(date).toISOString();
  return result;
};

export const formatNumber = ({
  value = 0,
  show_rupee_symbol = true,
  show_decimal_point = true,
}: TFormatNumber): string => {
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: show_decimal_point ? 2 : 0,
    maximumFractionDigits: show_decimal_point ? 2 : 0,
  }).format(value);

  return show_rupee_symbol ? `₹${formattedNumber}` : formattedNumber;
};
