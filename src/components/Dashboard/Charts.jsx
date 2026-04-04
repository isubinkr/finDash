import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useFinance } from "../../context/FinanceContext";
import { calculateSpendingByCategory } from "../../utils/helpers";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const Charts = () => {
  const { transactions, theme } = useFinance();
  const isDark = theme === "dark";
  const textColor = isDark ? "#e5e7eb" : "#374151";
  const gridColor = isDark ? "#374151" : "#f3f4f6";

  // Process data for Line Chart (Balance over time)
  // Sort chronologically
  const sortedTxs = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  let runningBalance = 0;
  const balanceData = sortedTxs.map((t) => {
    runningBalance += t.type === "income" ? t.amount : -t.amount;
    return runningBalance;
  });
  const labels = sortedTxs.map((t) => format(new Date(t.date), "MMM dd"));

  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Balance Trend",
        data: balanceData,
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: textColor },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
    },
  };

  // Process data for Doughnut Chart (Spending by Category)
  const spendingData = calculateSpendingByCategory(transactions);
  const doughnutColors = [
    "#0ea5e9",
    "#f43f5e",
    "#8b5cf6",
    "#10b981",
    "#f59e0b",
    "#64748b",
    "#ec4899",
    "#14b8a6",
  ];

  const doughnutChartData = {
    labels: spendingData.map((d) => d.category),
    datasets: [
      {
        data: spendingData.map((d) => d.amount),
        backgroundColor: doughnutColors.slice(0, spendingData.length),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: { color: textColor, padding: 20 },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-100">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Balance Overview
        </h3>
        <div className="h-75">
          <Line data={lineChartData} options={lineOptions} />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-100">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Expenses Breakdown
        </h3>
        <div className="h-75 flex items-center justify-center">
          {spendingData.length > 0 ? (
            <Doughnut data={doughnutChartData} options={doughnutOptions} />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No expenses recorded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
