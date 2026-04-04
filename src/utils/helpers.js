import { format, parseISO, isSameMonth } from "date-fns";

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString) => {
  return format(parseISO(dateString), "MMM dd, yyyy");
};

// Group transactions by category to calculate spending
export const calculateSpendingByCategory = (transactions) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const grouped = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);
};

export const calculateMonthlyComparison = (transactions) => {
  const now = new Date();
  const currentMonthTransactions = transactions.filter((t) =>
    isSameMonth(parseISO(t.date), now),
  );

  const lastMonth = new Date();
  lastMonth.setMonth(now.getMonth() - 1);
  const lastMonthTransactions = transactions.filter((t) =>
    isSameMonth(parseISO(t.date), lastMonth),
  );

  const calculateTotal = (txs) => {
    const income = txs
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = txs
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return income - expense;
  };

  return {
    current: calculateTotal(currentMonthTransactions),
    previous: calculateTotal(lastMonthTransactions),
  };
};

export const exportToCSV = (transactions) => {
  if (!transactions.length) return;

  const headers = [
    "Date",
    "Description",
    "Category",
    "Type",
    "Amount",
    "Running Balance",
  ];
  const csvRows = [headers.join(",")];

  transactions.forEach((t) => {
    const dateFormatted = format(parseISO(t.date), "yyyy-MM-dd");
    const desc = `"${(t.description || "").replace(/"/g, '""')}"`;
    const row = [
      dateFormatted,
      desc,
      t.category,
      t.type,
      t.amount,
      t.runningBalance || 0,
    ];
    csvRows.push(row.join(","));
  });

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `transactions_${format(new Date(), "yyyy-MM-dd")}.csv`,
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
