"use client";

import { useQuery } from "@tanstack/react-query";

// Constants
import { FETCH_TOP_3_STOCK_INVESTED } from "@/constants/query-key";

// Rest API
import { fetchTop3StockInvested } from "@/rest-api/chart";

// Components - Shadcn
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const OverallStat = () => {
  // Query
  const { data, isFetching, isError, error, isSuccess }: any = useQuery({
    queryKey: [FETCH_TOP_3_STOCK_INVESTED],
    queryFn: fetchTop3StockInvested,
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Overall Invested & Returns</CardTitle>
      </CardHeader>
      <CardContent className="py-6 px-1 md:px-4"></CardContent>
    </Card>
  );
};
