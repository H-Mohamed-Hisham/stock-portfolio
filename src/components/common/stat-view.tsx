// Types
import { TStat } from "@/types";

import { LineSkeleton } from "@/components/skeleton";

export function StatView({
  isFetched,
  data,
}: {
  isFetched: boolean;
  data: TStat;
}) {
  return (
    <div className="flex flex-col gap-4">
      {!isFetched && <LineSkeleton count={5} />}

      {isFetched && (
        <dl>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Asset</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {data.name}
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Total Invested</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {data.invested}
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Total Returns</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {data.returns}
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Shares Bought</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {data.quantity_bought}
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Shares Sold</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {data.quantity_sold}
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Shares Holding</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {data.quantity_holding}
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Profit/Loss (₹)</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {data.profit_loss_amount}
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
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
