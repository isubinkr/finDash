import { createContext, useContext, useState, useEffect } from "react";
import { initialTransactions } from "../data/mockData";

const FinanceContext = createContext();

export const useFinance = () => {
  return useContext(FinanceContext);
};

export const FinanceProvider = ({ children }) => {
  // Try to load from localStorage first
  const loadTransactions = () => {
    const saved = localStorage.getItem("transactions");
    if (saved) return JSON.parse(saved);
    return initialTransactions;
  };

  const loadTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    // System preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      return "dark";
    return "light";
  };

  const [transactions, setTransactions] = useState(loadTransactions);
  const [role, setRole] = useState("viewer"); // 'viewer' | 'admin'
  const [theme, setTheme] = useState(loadTheme);

  // Filters State
  const [filters, setFilters] = useState({
    search: "",
    type: "all", // 'all' | 'income' | 'expense'
    category: "all",
    sortBy: "date_desc", // 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const toggleRole = () =>
    setRole((prev) => (prev === "admin" ? "viewer" : "admin"));

  const addTransaction = (t) => setTransactions((prev) => [...prev, t]);
  const deleteTransaction = (id) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  const updateTransaction = (updated) =>
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t)),
    );

  // Derived state
  const getFilteredTransactions = () => {
    // 1. Calculate running balance chronologically
    const chronologicallySorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );
    let runningBalance = 0;
    const withRunningBalance = chronologicallySorted.map((t) => {
      runningBalance += t.type === "income" ? t.amount : -t.amount;
      return { ...t, runningBalance };
    });

    let result = [...withRunningBalance];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.category.toLowerCase().includes(searchLower) ||
          t.amount.toString().includes(searchLower) ||
          (t.description && t.description.toLowerCase().includes(searchLower)),
      );
    }

    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "date_desc":
          return new Date(b.date) - new Date(a.date);
        case "date_asc":
          return new Date(a.date) - new Date(b.date);
        case "amount_desc":
          return b.amount - a.amount;
        case "amount_asc":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return result;
  };

  const calculateTotals = () => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      income,
      expenses,
      balance: income - expenses,
    };
  };

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    role,
    toggleRole,
    theme,
    toggleTheme,
    filters,
    setFilters,
    filteredTransactions: getFilteredTransactions(),
    totals: calculateTotals(),
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};
