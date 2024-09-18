// Components
import { PageLayout } from "@/components/layout";
import { PageTitle } from "@/components/common";
import { UpdateTransactionForm } from "@/components/transaction";

export function UpdateTransactionPage() {
  return (
    <PageLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-start-5 md:col-span-4">
          <PageTitle title="Update Transaction" />
        </div>
        <div className="col-span-12 md:col-start-5 md:col-span-4">
          <UpdateTransactionForm />
        </div>
      </div>
    </PageLayout>
  );
}
