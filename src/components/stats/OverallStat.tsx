"use client";

import { useQuery } from "@tanstack/react-query";

// Constants
import { FETCH_OVERALL_STATS } from "@/constants/query-key";

// Rest API
import { fetchOverallStats } from "@/rest-api/stats";

// Lib
import { formatNumber } from "@/lib/formatter";

// Components - Shadcn
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const OverallStat = () => {
  // Query
  const { data, isFetching, isError, error, isSuccess }: any = useQuery({
    queryKey: [FETCH_OVERALL_STATS],
    queryFn: fetchOverallStats,
  });

  return (
    <Card className="w-full">
      <CardHeader className="py-3">
        <CardTitle className="text-base pb-0">Total Invested</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        <div className="text-2xl font-bold">
          {formatNumber({ value: data?.invested, show_rupee_symbol: true })}
        </div>
      </CardContent>

      <CardHeader className="py-3">
        <CardTitle className="text-base pb-0">Total Returns</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        <div className="text-2xl font-bold">
          {formatNumber({ value: data?.returns, show_rupee_symbol: true })}
        </div>
      </CardContent>
    </Card>
  );
};
