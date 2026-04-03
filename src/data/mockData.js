import { v4 as uuidv4 } from "uuid";

export const initialTransactions = [
  {
    id: uuidv4(),
    amount: 5000,
    category: "Salary",
    type: "income",
    date: "2024-03-01T10:00:00Z",
  },
  {
    id: uuidv4(),
    amount: 1500,
    category: "Housing",
    type: "expense",
    date: "2024-03-02T14:30:00Z",
  },
  {
    id: uuidv4(),
    amount: 150,
    category: "Food",
    type: "expense",
    date: "2024-03-05T19:00:00Z",
  },
  {
    id: uuidv4(),
    amount: 60,
    category: "Transport",
    type: "expense",
    date: "2024-03-08T08:15:00Z",
  },
  {
    id: uuidv4(),
    amount: 300,
    category: "Shopping",
    type: "expense",
    date: "2024-03-10T16:45:00Z",
  },
  {
    id: uuidv4(),
    amount: 120,
    category: "Utilities",
    type: "expense",
    date: "2024-03-12T09:30:00Z",
  },
  {
    id: uuidv4(),
    amount: 1000,
    category: "Freelance",
    type: "income",
    date: "2024-03-15T11:00:00Z",
  },
  {
    id: uuidv4(),
    amount: 200,
    category: "Entertainment",
    type: "expense",
    date: "2024-03-18T20:00:00Z",
  },

  // Previous month data for MoM comparison
  {
    id: uuidv4(),
    amount: 5000,
    category: "Salary",
    type: "income",
    date: "2024-02-01T10:00:00Z",
  },
  {
    id: uuidv4(),
    amount: 1600,
    category: "Housing",
    type: "expense",
    date: "2024-02-02T14:30:00Z",
  },
  {
    id: uuidv4(),
    amount: 400,
    category: "Food",
    type: "expense",
    date: "2024-02-05T19:00:00Z",
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
