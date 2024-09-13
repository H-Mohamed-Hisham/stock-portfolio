// Types
import { TOverallProfitLoss } from "@/types";

import { LineSkeleton } from "@/components/skeleton";

export function OverallStatDetail({
  isFetched,
  data,
}: {
  isFetched: boolean;
  data: TOverallProfitLoss;
}) {
  return (
    <div className="flex flex-col gap-4">
      {!isFetched && <LineSkeleton count={4} />}

      {isFetched && (
        <dl className="">
          <div className="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Total Invested</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {data.invested}
            </dd>
          </div>
          <div className="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Total Returns</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {data.returns}
            </dd>
          </div>
          <div className="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Profit/Loss (₹)</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {data.profit_loss_amount}
            </dd>
          </div>
          <div className="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Profit/Loss</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {data.profit_loss_status}
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
}
