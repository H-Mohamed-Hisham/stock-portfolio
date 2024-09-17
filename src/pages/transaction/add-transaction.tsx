// Components
import { PageLayout } from "@/components/layout";
import { AddTransactionForm } from "@/components/transaction";

export function AddTransactionPage() {
  return (
    <PageLayout>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-start-5 md:col-span-4">
          <AddTransactionForm />
        </div>
      </div>
    </PageLayout>
  );
}
