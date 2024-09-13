import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

// Types
import { TStat } from "@/types";

// Constants
import { green, red, blue } from "@/constants/miscellaneous";

// Components
import { BarChartSkeleton } from "@/components/skeleton";

export function ProfitLossChart({
  isFetched,
  data,
}: {
  isFetched: boolean;
  data: TStat;
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

      {isFetched && <ReactECharts option={chart_option} />}
    </>
  );
}
