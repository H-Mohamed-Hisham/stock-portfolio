// Components
import { PageLayout } from "@/components/layout";
import { PageTitle } from "@/components/common";
import { CreateTransactionForm } from "@/components/transaction";

export function CreateTransactionPage() {
  return (
    <PageLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-start-5 md:col-span-4">
          <PageTitle title="Create Transaction" />
        </div>
        <div className="col-span-12 md:col-start-5 md:col-span-4">
          <CreateTransactionForm />
        </div>
      </div>
    </PageLayout>
  );
}
