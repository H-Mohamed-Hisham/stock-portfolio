// Components
import { PageLayout } from "@/components/layout";
import { PageTitle } from "@/components/common";
import { CreateAssetForm } from "@/components/asset";

export function CreateAssetPage() {
  return (
    <PageLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-start-5 md:col-span-4">
          <PageTitle title="Create Asset" />
        </div>
        <div className="col-span-12 md:col-start-5 md:col-span-4">
          <CreateAssetForm />
        </div>
      </div>
    </PageLayout>
  );
}
