"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// Types
import {
  TStockInvestReturnChartData,
  TStockInvestReturnChartConfig,
} from "@/types";

// Components - Shadcn
import {
  // ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

type Props = {
  chart_data: TStockInvestReturnChartData[];
  chart_config: TStockInvestReturnChartConfig;
  x_axis: string;
};

export const BarChartMultiple = ({
  chart_data,
  chart_config,
  x_axis,
}: Props) => {
  return (
    <ChartContainer config={chart_config} className="min-h-[200px] w-72">
      <BarChart accessibilityLayer data={chart_data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={x_axis}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.entries(chart_config).map(([key]) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            radius={4}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
};
