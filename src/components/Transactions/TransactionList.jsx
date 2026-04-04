import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import { formatDate, formatCurrency, exportToCSV } from "../../utils/helpers";
import TransactionFilters from "./TransactionFilters";
import TransactionForm from "./TransactionForm";
import { Pencil, Trash2, Plus, AlertCircle, Download } from "lucide-react";
import { clsx } from "clsx";

const TransactionList = () => {
  const { filteredTransactions, role, deleteTransaction } = useFinance();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Recent Transactions
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportToCSV(filteredTransactions)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium shadow-sm"
          >
            <Download size={16} />
            Export CSV
          </button>
          {role === "admin" && (
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium shadow-sm"
            >
              <Plus size={16} />
              Add New
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        <TransactionFilters />

        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800/80">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Balance
                  </th>
                  {role === "admin" && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map((transaction) => {
                  const isPositive = transaction.type === "income";

                  return (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                        {transaction.description || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={clsx(
                            "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                            isPositive
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
                          )}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td
                        className={clsx(
                          "px-6 py-4 whitespace-nowrap text-sm text-right font-medium",
                          isPositive
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-gray-900 dark:text-white",
                        )}
                      >
                        {isPositive ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white font-medium">
                        {formatCurrency(transaction.runningBalance || 0)}
                      </td>

                      {role === "admin" && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(transaction)}
                              className="text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                              title="Edit transaction"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => deleteTransaction(transaction.id)}
                              className="text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                              title="Delete transaction"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-full mb-4">
              <AlertCircle size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No transactions found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              We couldn't find any transactions matching your current filters.
              Try adjusting them or clear your search.
            </p>
          </div>
        )}
      </div>

      <TransactionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingTransaction}
      />
    </div>
  );
};

export default TransactionList;
