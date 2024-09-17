// Types
import { TStat, TApiError } from "@/types";

// Lib
import { formatNumber } from "@/lib/formatters";

// Components
import { LineSkeleton } from "@/components/skeleton";
import { ProfitLoss, AlertMessage } from "@/components/common";

export function StatView({
  isFetched,
  data,
  error,
}: {
  isFetched: boolean;
  data: TStat;
  error: TApiError | null | Error;
}) {
  return (
    <div className="flex flex-col gap-4">
      {!isFetched && <LineSkeleton count={5} />}

      {error && <AlertMessage message={error.message} />}

      {isFetched && !error && (
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
              {formatNumber({ value: data.invested })}
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Total Returns</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {formatNumber({ value: data.returns })}
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Shares Bought</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {formatNumber({
                value: data.quantity_bought,
                show_rupee_symbol: false,
                show_decimal_point: false,
              })}
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Shares Sold</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {formatNumber({
                value: data.quantity_sold,
                show_rupee_symbol: false,
                show_decimal_point: false,
              })}
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Shares Holding</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {formatNumber({
                value: data.quantity_holding,
                show_rupee_symbol: false,
                show_decimal_point: false,
              })}
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Profit/Loss (₹)</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              <ProfitLoss
                value={formatNumber({
                  value: data.profit_loss_amount,
                })}
                status={data.profit_loss_status}
              />
            </dd>
          </div>
          <div className="p-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Profit/Loss</dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              <ProfitLoss value={null} status={data.profit_loss_status} />
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
}
