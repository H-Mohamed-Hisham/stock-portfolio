import { useQuery } from "@tanstack/react-query";

// API
import { fetch_overall_stat } from "@/api";

// Constants
import { FETCH_OVERALL_STAT_QUERY_KEY } from "@/constants/query-key";

// Types
import { TOverallStatPayload } from "@/types";

// Components
import { StatView } from "@/components/common";
import { ProfitLossChart, SharesChart } from "@/components/chart";

// Shadcn
import { Card, CardContent } from "@/components/ui/card";

export function OverallStat({ asset_type }: TOverallStatPayload) {
  // Query
  const { data, isFetched, error } = useQuery({
    queryKey: [
      FETCH_OVERALL_STAT_QUERY_KEY,
      {
        asset_type: asset_type,
      },
    ],
    queryFn: () =>
      fetch_overall_stat({
        asset_type: asset_type,
      }),
  });

  return (
    <>
      <Card className="w-full h-full p-3">
        <CardContent className="p-1">
          <StatView isFetched={isFetched} error={error} data={data} />
        </CardContent>
      </Card>
      <Card className="w-full h-full p-3">
        <CardContent className="p-1">
          <ProfitLossChart isFetched={isFetched} error={error} data={data} />
        </CardContent>
      </Card>
      <Card className="w-full h-full p-3">
        <CardContent className="p-1">
          <SharesChart isFetched={isFetched} error={error} data={data} />
        </CardContent>
      </Card>
    </>
  );
}
