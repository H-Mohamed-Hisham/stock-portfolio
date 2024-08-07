import { AddStockTransactionForm } from "@/components/transaction/stock";

const AddStockTransaction = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-span-6">
        {/* <PageTitle title="Add Stock Transaction" /> */}

        <AddStockTransactionForm />
      </div>
    </div>
  );
};

export default AddStockTransaction;
