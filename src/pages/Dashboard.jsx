import Charts from "../components/Dashboard/Charts";
import Insights from "../components/Dashboard/Insights";
import SummaryCards from "../components/Dashboard/SummaryCards";
import TransactionList from "../components/Transactions/TransactionList";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, User
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-8">
          Here's what's happening with your finances today.
        </p>
      </div>

      <SummaryCards />
      <Insights />
      <Charts />
      <TransactionList />
    </div>
  );
};

export default Dashboard;
