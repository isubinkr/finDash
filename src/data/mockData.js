import { v4 as uuidv4 } from "uuid";

// Helper to get dates safely distributed within the elapsed time of the month
// to absolutely guarantee no future dates are generated.
const getRelativeDate = (monthOffset, index, totalItems) => {
  const now = new Date();

  if (monthOffset === 0) {
    // Current month: Distribute evenly between 1st of the month and exactly right now
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const elapsed = now.getTime() - startOfMonth.getTime();
    const fraction = (index + 1) / (totalItems + 1);
    return new Date(startOfMonth.getTime() + elapsed * fraction).toISOString();
  } else {
    // Historic months: Distribute over 28 days to prevent overflow bugs
    const startOfThatMonth = new Date(
      now.getFullYear(),
      now.getMonth() + monthOffset,
      1,
    );
    const totalTime = 28 * 24 * 60 * 60 * 1000;
    const fraction = (index + 1) / (totalItems + 1);
    return new Date(
      startOfThatMonth.getTime() + totalTime * fraction,
    ).toISOString();
  }
};

export const initialTransactions = [
  // Current month data (Offset 0)
  {
    id: uuidv4(),
    amount: 5000,
    category: "Salary",
    type: "income",
    date: getRelativeDate(0, 0, 8),
    description: "Monthly Salary",
  },
  {
    id: uuidv4(),
    amount: 1500,
    category: "Housing",
    type: "expense",
    date: getRelativeDate(0, 1, 8),
    description: "Rent Payment",
  },
  {
    id: uuidv4(),
    amount: 150,
    category: "Food",
    type: "expense",
    date: getRelativeDate(0, 2, 8),
    description: "Groceries",
  },
  {
    id: uuidv4(),
    amount: 60,
    category: "Transport",
    type: "expense",
    date: getRelativeDate(0, 3, 8),
    description: "Gas Station",
  },
  {
    id: uuidv4(),
    amount: 300,
    category: "Shopping",
    type: "expense",
    date: getRelativeDate(0, 4, 8),
    description: "Clothes",
  },
  {
    id: uuidv4(),
    amount: 120,
    category: "Utilities",
    type: "expense",
    date: getRelativeDate(0, 5, 8),
    description: "Electric Bill",
  },
  {
    id: uuidv4(),
    amount: 1000,
    category: "Freelance",
    type: "income",
    date: getRelativeDate(0, 6, 8),
    description: "Web Project",
  },
  {
    id: uuidv4(),
    amount: 200,
    category: "Entertainment",
    type: "expense",
    date: getRelativeDate(0, 7, 8),
    description: "Concert Tickets",
  },

  // Previous month data for MoM comparison (Offset -1)
  {
    id: uuidv4(),
    amount: 5000,
    category: "Salary",
    type: "income",
    date: getRelativeDate(-1, 0, 3),
    description: "Monthly Salary",
  },
  {
    id: uuidv4(),
    amount: 1600,
    category: "Housing",
    type: "expense",
    date: getRelativeDate(-1, 1, 3),
    description: "Rent Payment",
  },
  {
    id: uuidv4(),
    amount: 400,
    category: "Food",
    type: "expense",
    date: getRelativeDate(-1, 2, 3),
    description: "Groceries",
  },
];

export const categories = {
  income: ["Salary", "Freelance", "Investments", "Other"],
  expense: [
    "Housing",
    "Food",
    "Transport",
    "Shopping",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Other",
  ],
};
