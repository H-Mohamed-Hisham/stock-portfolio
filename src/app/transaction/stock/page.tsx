// Constants
import { stock_menu_tabs } from "@/constants/menu";

// Components
import { MenuTabs } from "@/components/common";
import { AllTransactionTable } from "@/components/transaction/stock";

const StockTransaction = () => {
  return (
    <div className="md:container md:mx-auto">
      <MenuTabs tabs={stock_menu_tabs} />

      <AllTransactionTable />
    </div>
  );
};

export default StockTransaction;
