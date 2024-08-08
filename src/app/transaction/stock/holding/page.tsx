// Constants
import { stock_menu_tabs } from "@/constants/menu";

// Components
import { MenuTabs } from "@/components/common";
import { HoldingTable } from "@/components/transaction/stock";

const StockHoldings = () => {
  return (
    <div className="md:container md:mx-auto">
      <MenuTabs tabs={stock_menu_tabs} />

      <HoldingTable />
    </div>
  );
};

export default StockHoldings;
