import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

// API
import { overall_profit_loss } from "@/api";

// Components
import { Chart } from "@/components/chart";

// Shadcn
import { Card, CardContent } from "@/components/ui/card";

export function OverallProfitLossChart() {
  // Query
  const { data } = useQuery({
    queryKey: [
      "TEST",
      {
        asset_type: "stock",
      },
    ],
    queryFn: () =>
      overall_profit_loss([
        "TEST",
        {
          asset_type: "stock",
        },
      ]),
  });

  const chart_data = useMemo(() => {
    return [
      {
        symbol: data?.symbol,
        invested: data?.invested,
        returns: data?.returns,
      },
    ];
  }, [data]);

  console.log("cd :: ", chart_data);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
        name: "Direct",
        type: "bar",
        barWidth: "60%",
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };

  return (
    <Card className="w-full">
      <CardContent>
        <Chart option={option} />
      </CardContent>
    </Card>
  );
}
