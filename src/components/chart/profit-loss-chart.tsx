import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

// Types
import { TStat } from "@/types";

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
          name: "Invested",
          type: "bar",
          data: [data.invested],
        },
        {
          name: "Returns",
          type: "bar",
          data: [data.returns],
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
