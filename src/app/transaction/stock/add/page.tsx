"use client";

import { AddStockTransactionForm } from "@/components/transaction/stock";

const AddStockTransaction = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* <div className="col-start-4 col-span-6">
        <AddStockTransactionForm />
      </div> */}

      <div className="col-span-12 md:col-start-4 md:col-span-6">
        <AddStockTransactionForm />
      </div>
    </div>
  );
};

export default AddStockTransaction;
