import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

// Types
import { TStat, TApiError } from "@/types";

// Constants
import { white, black, green, red, blue } from "@/constants/miscellaneous";

// Providers
import { useTheme } from "@/providers/theme/theme-provider";

// Components
import { RoundSkeleton } from "@/components/skeleton";
import { AlertMessage } from "@/components/common";

export function SharesChart({
  isFetched,
  data,
  error,
}: {
  isFetched: boolean;
  data: TStat;
  error: TApiError | null | Error;
}) {
  // Hooks
  const { theme } = useTheme();

  const chart_option = useMemo(() => {
    if (!data) {
      return {};
    }

    return {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "2%",
        left: "center",
        textStyle: {
          color: theme === "light" ? black : white,
        },
      },
      series: [
        {
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
            },
          },
          labelLine: {
            show: false,
          },
          type: "pie",
          radius: ["40%", "70%"],
          data: [
            {
              name: "Bought",
              value: data.quantity_bought,
              itemStyle: {
                color: green,
              },
            },
            {
              name: "Sold",
              value: data.quantity_sold,
              itemStyle: {
                color: red,
              },
            },
            {
              name: "Holding",
              value: data.quantity_holding,
              itemStyle: {
                color: blue,
              },
            },
          ],
        },
      ],
    };
  }, [data, theme]);

  return (
    <>
      {!isFetched && <RoundSkeleton />}

      {error && <AlertMessage message={error.message} />}

      {isFetched && <ReactECharts option={chart_option} />}
    </>
  );
}
