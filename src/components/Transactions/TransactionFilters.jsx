import { useFinance } from "../../context/FinanceContext";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { categories } from "../../data/mockData";

export const TransactionFilters = () => {
  const { filters, setFilters } = useFinance();

  const handleSearchChange = (e) =>
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  const handleTypeChange = (e) =>
    setFilters((prev) => ({ ...prev, type: e.target.value }));
  const handleCategoryChange = (e) =>
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  const handleSortChange = (e) =>
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));

  // Collect all unique categories
  const allCategories = [
    ...new Set([...categories.income, ...categories.expense]),
  ].sort();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4 md:flex-wrap">
      {/* Search Bar */}
      <div className="relative flex-1 min-w-[200px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search transactions..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors sm:text-sm"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Type Filter */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Filter size={16} className="text-gray-400" />
        </div>
        <select
          value={filters.type}
          onChange={handleTypeChange}
          className="block w-full pl-9 pr-8 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors sm:text-sm appearance-none"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="relative min-w-37.5">
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="block w-full pl-3 pr-8 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors sm:text-sm appearance-none"
        >
          <option value="all">All Categories</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Filter */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ArrowUpDown size={16} className="text-gray-400" />
        </div>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="block w-full pl-9 pr-8 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors sm:text-sm appearance-none"
        >
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
          <option value="amount_desc">Highest Amount</option>
          <option value="amount_asc">Lowest Amount</option>
        </select>
      </div>
    </div>
  );
};

export default TransactionFilters;
