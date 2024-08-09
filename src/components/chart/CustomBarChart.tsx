"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// Types
import { TStockChartData, TStockChartConfig } from "@/types";

// Lib
import { formatNumber } from "@/lib/formatter";

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
  chart_data: TStockChartData[];
  chart_config: TStockChartConfig;
  x_axis: string;
};

export const CustomBarChart = ({ chart_data, chart_config, x_axis }: Props) => {
  return (
    <ChartContainer config={chart_config} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chart_data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={x_axis}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
            // formatter={(value: any) => formatNumber(value, true)}
            />
          }
        />
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
