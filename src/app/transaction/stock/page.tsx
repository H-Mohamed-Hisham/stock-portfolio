// Components
import { MenuTabs } from "@/components/transaction/stock/MenuTabs";
import { AllTransactionTable } from "@/components/transaction/stock/AllTransactionTable";

const StockTransaction = () => {
  return (
    <div className="md:container md:mx-auto">
      <MenuTabs />

      <AllTransactionTable />
    </div>
  );
};

export default StockTransaction;
