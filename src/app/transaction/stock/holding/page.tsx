// Constants
import { stock_menu_tabs } from "@/constants/menu";

// Components
import { MenuTabs } from "@/components/common";

const StockHoldings = () => {
  return (
    <div className="md:container md:mx-auto">
      <MenuTabs tabs={stock_menu_tabs} />
    </div>
  );
};

export default StockHoldings;
