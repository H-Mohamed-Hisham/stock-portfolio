// Components
import { PageLayout } from "@/components/layout";
import { CreateTransactionForm } from "@/components/transaction";

export function CreateTransactionPage() {
  return (
    <PageLayout>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-start-5 md:col-span-4">
          <CreateTransactionForm />
        </div>
      </div>
    </PageLayout>
  );
}
