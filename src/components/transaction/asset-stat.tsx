import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// API
import { fetch_asset_stat } from "@/api";

// Constants
import { FETCH_ASSET_QUERY_KEY } from "@/constants/query-key";

// Components
import { StatView } from "@/components/common";
import { ProfitLossChart, SharesChart } from "@/components/chart";

// Shadcn
import { Card, CardContent } from "@/components/ui/card";

export function AssetStat() {
  // Router
  const { asset_id } = useParams<{ asset_id: string }>();

  // Query
  const { data, isFetched, error } = useQuery({
    queryKey: [
      FETCH_ASSET_QUERY_KEY,
      {
        asset_id: asset_id,
      },
    ],
    queryFn: () =>
      fetch_asset_stat({
        asset_id: asset_id,
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
