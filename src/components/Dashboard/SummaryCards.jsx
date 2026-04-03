import { useFinance } from "../../context/FinanceContext";
import { formatCurrency } from "../../utils/helpers";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Card = ({ title, amount, type, icon: Icon }) => {
  const isPositive = type === "income";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(amount)}
          </h3>
        </div>
        <div
          className={twMerge(
            "p-3 rounded-full transition-colors",
            type === "balance"
              ? "bg-brand-50 text-brand-500 dark:bg-brand-900/30"
              : isPositive
                ? "bg-emerald-50 text-emerald-500 dark:bg-emerald-900/30"
                : "bg-rose-50 text-rose-500 dark:bg-rose-900/30",
          )}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

const SummaryCards = () => {
  const { totals } = useFinance();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card
        title="Total Balance"
        amount={totals.balance}
        type="balance"
        icon={Wallet}
      />
      <Card
        title="Total Income"
        amount={totals.income}
        type="income"
        icon={ArrowUpRight}
      />
      <Card
        title="Total Expenses"
        amount={totals.expenses}
        type="expense"
        icon={ArrowDownRight}
      />
    </div>
  );
};

export default SummaryCards;
