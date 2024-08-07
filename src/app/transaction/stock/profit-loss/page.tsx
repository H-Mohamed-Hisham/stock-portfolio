// Constants
import { stock_menu_tabs } from "@/constants/menu";

// Components
import { MenuTabs } from "@/components/common/MenuTabs";
import { ProfitLossTable } from "@/components/transaction/stock/ProfitLossTable";

const StockProfitLoss = () => {
  return (
    <div className="md:container md:mx-auto">
      <MenuTabs tabs={stock_menu_tabs} />

      <ProfitLossTable />
    </div>
  );
};

export default StockProfitLoss;
