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

// Components
import { LineSkeleton, OverallProfitLossAmount } from "@/components/common";

export const OptionOverallStat = () => {
  // Query
  //   const { data, isFetching, isError, error, isSuccess }: any = useQuery({
  //     queryKey: [FETCH_OVERALL_STATS],
  //     queryFn: fetchOverallStats,
  //   });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="dark:text-primary text-base pb-0">
          Option Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-1.5 pt-0 pb-3">
        <div className="dark:text-primary">Total Invested</div>

        {/* Remove below code once api is ready */}
        <div className="text-2xl font-bold">
          {formatNumber({ value: 12000, show_rupee_symbol: true })}
        </div>

        {/* {isFetching && <LineSkeleton />}

        {!isFetching && isSuccess && (
          <div className="text-2xl font-bold">
            {formatNumber({ value: data?.invested, show_rupee_symbol: true })}
          </div>
        )} */}
        <div className="dark:text-primary">Total Returns</div>

        {/* Remove below code once api is ready */}
        <div className="text-2xl font-bold">
          <OverallProfitLossAmount type={"loss"} amount={11000} />
        </div>

        {/* {isFetching && <LineSkeleton />}

        {!isFetching && isSuccess && (
          <div className="text-2xl font-bold">
            <OverallProfitLossAmount
              type={data?.profit_loss_status}
              amount={data?.returns}
            />
          </div>
        )} */}
      </CardContent>
    </Card>
  );
};
