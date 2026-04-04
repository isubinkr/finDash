import { useFinance } from "../../context/FinanceContext";
import {
  calculateSpendingByCategory,
  calculateMonthlyComparison,
  formatCurrency,
} from "../../utils/helpers";
import { TrendingUp, TrendingDown, PieChart, Activity } from "lucide-react";
import { clsx } from "clsx";

const Insights = () => {
  const { transactions } = useFinance();

  const spending = calculateSpendingByCategory(transactions);
  const highestSpend = spending.length > 0 ? spending[0] : null;
  const mom = calculateMonthlyComparison(transactions);

  const increase =
    mom.previous > 0 ? ((mom.current - mom.previous) / mom.previous) * 100 : 0;

  const isPositiveGrowth = increase >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Activity size={20} className="text-brand-500" />
        Quick Insights
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Insight 1: Highest Spend Category */}
        <div className="flex items-start gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-full text-purple-500">
            <PieChart size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Top Expense Category
            </p>
            {highestSpend ? (
              <>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {highestSpend.category}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  {formatCurrency(highestSpend.amount)}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400">N/A</p>
            )}
          </div>
        </div>

        {/* Insight 2: Monthly Comparison */}
        <div className="flex items-start gap-4 sm:border-l sm:border-gray-100 dark:sm:border-gray-700 sm:pl-6">
          <div
            className={clsx(
              "p-3 rounded-full",
              isPositiveGrowth
                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500"
                : "bg-rose-50 dark:bg-rose-900/30 text-rose-500",
            )}
          >
            {isPositiveGrowth ? (
              <TrendingUp size={20} />
            ) : (
              <TrendingDown size={20} />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Net Balance vs Last Month
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {formatCurrency(mom.current)}
            </p>
            <p
              className={clsx(
                "text-sm font-medium flex items-center gap-1",
                isPositiveGrowth
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400",
              )}
            >
              {Math.abs(increase).toFixed(1)}%{" "}
              {isPositiveGrowth ? "higher" : "lower"}
            </p>
          </div>
        </div>

        {/* Insight 3: Transaction Volume */}
        <div className="flex items-start gap-4 sm:border-l sm:border-gray-100 dark:sm:border-gray-700 sm:pl-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full text-blue-500">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Total Transactions
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {transactions.length}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              All time count
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
