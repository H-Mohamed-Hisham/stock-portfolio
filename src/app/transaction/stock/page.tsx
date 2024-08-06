// Components
import { MenuTabs } from "@/components/transaction/stock/MenuTabs";
import { StockTransactionTable } from "@/components/transaction/stock/StockTransactionTable";

const StockTransaction = () => {
  return (
    <div className="md:container md:mx-auto">
      <MenuTabs />

      <StockTransactionTable />
    </div>
  );
};

export default StockTransaction;
