// Components
import { StockOverallStat, OptionOverallStat } from "@/components/stats";

const Home = () => {
  return (
    <div className="md:container md:mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <StockOverallStat />

        <OptionOverallStat />
      </div>
    </div>
  );
};

export default Home;
