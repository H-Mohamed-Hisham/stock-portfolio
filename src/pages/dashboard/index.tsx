// Components
import { PageLayout } from "@/components/layout";
import { OverallProfitLossChart } from "@/components/dashboard";

export function DashboardPage() {
  return (
    <PageLayout>
      <OverallProfitLossChart />
    </PageLayout>
  );
}
