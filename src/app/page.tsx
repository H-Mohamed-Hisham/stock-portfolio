// Components
import { OverallStat } from "@/components/stats";

const Home = () => {
  return (
    <div className="md:container md:mx-auto">
      <div className="grid grid-cols-3 gap-4">
        <OverallStat />
      </div>
    </div>
  );
};

export default Home;
