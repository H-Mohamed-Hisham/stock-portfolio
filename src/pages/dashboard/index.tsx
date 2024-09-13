// Components
import { PageLayout } from "@/components/layout";
import { OverallStat } from "@/components/dashboard";

export function DashboardPage() {
  return (
    <PageLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <OverallStat asset_type="stock" />
        <OverallStat asset_type="index" />
      </div>
    </PageLayout>
  );
}
