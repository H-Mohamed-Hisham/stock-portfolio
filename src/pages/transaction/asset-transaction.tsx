// Components
import { PageLayout } from "@/components/layout";
import { AssetTransaction, AssetStat } from "@/components/transaction";

export function AssetTransactionPage() {
  return (
    <PageLayout>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <AssetStat />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <AssetTransaction />
        </div>
      </div>
    </PageLayout>
  );
}
