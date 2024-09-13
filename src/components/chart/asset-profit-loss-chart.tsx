import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

// Types
import { TAssetProfitLoss } from "@/types";

export function AssetProfitLossChart({ data }: { data: TAssetProfitLoss }) {
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

  return <ReactECharts option={chart_option} />;
}
