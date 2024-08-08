"use client";

import { useQuery } from "@tanstack/react-query";

// Constants
import { FETCH_TOP_3_STOCK_INVESTED } from "@/constants/query-key";

// Rest API
import { fetchTop3StockInvested } from "@/rest-api/chart";

// Types
import {
  // TStockChartData,
  TStockChartConfig,
} from "@/types";

// Components - Shadcn
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Components
import { CustomBarChart } from "@/components/custom-chart";

export const TopInvestedChart = () => {
  // Query
  const { data, isFetching, isError, error, isSuccess }: any = useQuery({
    queryKey: [FETCH_TOP_3_STOCK_INVESTED],
    queryFn: fetchTop3StockInvested,
  });

  const chartConfig: TStockChartConfig = {
    invested: {
      label: "Invested",
      color: "hsl(var(--primary))",
    },
    // returns: {
    //   label: "Returns",
    //   color: "#60a5fa",
    // },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top Invested</CardTitle>
      </CardHeader>
      <CardContent className="py-6 px-1 md:px-4">
        <CustomBarChart
          chart_data={data}
          chart_config={chartConfig}
          x_axis={"stock"}
        />
      </CardContent>
    </Card>
  );
};
