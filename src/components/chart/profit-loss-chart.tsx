import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

// Types
import { TStat, TApiError } from "@/types";

// Constants
import { green, red, blue } from "@/constants/miscellaneous";

// Components
import { BarChartSkeleton } from "@/components/skeleton";
import { AlertMessage } from "@/components/common";

export function ProfitLossChart({
  isFetched,
  data,
  error,
}: {
  isFetched: boolean;
  data: TStat;
  error: TApiError | null | Error;
}) {
  const chart_option = useMemo(() => {
    if (!data) {
      return {};
    }

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: [
        {
          type: "category",
          data: ["Invested", "Returns"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          type: "bar",
          data: [
            {
              value: data.invested,
              itemStyle: {
                color:
                  data.invested < data.returns
                    ? green
                    : data.invested > data.returns
                    ? red
                    : blue,
              },
            },
            {
              value: data.returns,
              itemStyle: {
                color:
                  data.invested < data.returns
                    ? green
                    : data.invested > data.returns
                    ? red
                    : blue,
              },
            },
          ],
        },
      ],
    };
  }, [data]);

  return (
    <>
      {!isFetched && <BarChartSkeleton count={2} />}

      {error && <AlertMessage message={error.message} />}

      {isFetched && !error && <ReactECharts option={chart_option} />}
    </>
  );
}
