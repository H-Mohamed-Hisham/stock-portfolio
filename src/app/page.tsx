// Types
import {
  TStockInvestReturnChartData,
  TStockInvestReturnChartConfig,
} from "@/types";

// Components - Shadcn
import { Card, CardContent } from "@/components/ui/card";

// Components
import { BarChartMultiple } from "@/components/chart";

const Home = () => {
  const data: TStockInvestReturnChartData[] = [
    {
      stock: "AAAA",
      invested: 20,
      returns: 30,
    },
  ];

  const chartConfig: TStockInvestReturnChartConfig = {
    invested: {
      label: "Invested",
      color: "#2563eb",
    },
    returns: {
      label: "Returns",
      color: "#60a5fa",
    },
  };

  return (
    <div className="md:container md:mx-auto">
      <BarChartMultiple
        chart_data={data}
        chart_config={chartConfig}
        x_axis={"stock"}
      />
    </div>
  );
};

export default Home;
