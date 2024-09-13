import { useQuery } from "@tanstack/react-query";

// API
import { overall_profit_loss } from "@/api";

// Constants
import { OVERALL_PROFIT_LOSS } from "@/constants/query-key";

// Types
import { TOverallProfitLossParam } from "@/types";

// Components
import { OverallProfitLossChart } from "@/components/chart";
import { OverallStatDetail } from "@/components/dashboard";

// Shadcn
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function OverallStat({ asset_type }: TOverallProfitLossParam) {
  // Query
  const { data, isFetched } = useQuery({
    queryKey: [
      OVERALL_PROFIT_LOSS,
      {
        asset_type: asset_type,
      },
    ],
    queryFn: () =>
      overall_profit_loss({
        asset_type: asset_type,
      }),
  });

  return (
    <>
      <Card className="w-full h-full p-3">
        <CardHeader className="p-1">
          <div>Stock Stat</div>
        </CardHeader>
        <CardContent className="p-1">
          <OverallStatDetail isFetched={isFetched} data={data} />
        </CardContent>
      </Card>
      <Card className="w-full h-full p-3">
        <CardContent className="p-1">
          <OverallProfitLossChart isFetched={isFetched} data={data} />
        </CardContent>
      </Card>
      <Card className="w-full h-full p-3">
        <CardContent className="p-1">
          <OverallProfitLossChart isFetched={isFetched} data={data} />
        </CardContent>
      </Card>
    </>
  );
}
