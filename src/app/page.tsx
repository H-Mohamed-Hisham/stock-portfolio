// Components
import { TopInvestedChart, TopProfitChart } from "@/components/chart";

const Home = () => {
  return (
    <div className="md:container md:mx-auto">
      <div className="grid grid-cols-3 gap-4">
        <TopInvestedChart />

        <TopProfitChart />
      </div>
    </div>
  );
};

export default Home;
