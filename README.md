# finDash - Finance Dashboard

A clean, responsive, and functional personal finance dashboard application built with React and Tailwind CSS. This application allows users to manage financial transactions, visualize spending patterns, and maintain a seamless record of financial data—all entirely on the frontend.

## 🚀 Features

- **Dashboard Insights**: High-level summary cards (Total Income, Total Expenses, Balance) and dynamic charts showing expense breakdowns and balance trends over time.
- **Transaction Management**: Add, edit, or delete transactions including details like Date, Description, Category, Type (Income/Expense), and Amount.
- **Running Balances**: Tracks the exact balance at each point in time within the transaction list.
- **Search & Filters**: Quickly locate transactions using real-time text search and filter by month, transaction type, or specific categories.
- **Data Persistence**: Uses the browser's `localStorage` to confidently save your transactions, settings, and theme preferences so they persist across sessions.
- **Export to CSV**: Download the currently filtered list of transactions securely to your local machine as a `.csv` file.
- **Role-based Access Control**: Switch between an `Admin` or `Viewer` role to simulate view-only or fully interactive data permissions.
- **Dark Mode Support**: Beautifully maps across light and dark modern aesthetics based seamlessly on global themes.

## 🧠 Overview of Approach

This project strictly follows a frontend-only architecture prioritizing a fast, self-contained UI/UX workflow.

- **Framework**: Built with React (bootstrapped with Vite) for fast rendering and a lightweight development ecosystem.
- **Styling**: Driven exclusively by Tailwind CSS for responsive, utility-first styling. The UI utilizes polished custom colors, glassmorphism-lite accents, padding structure, and smooth micro-interactions to create a premium feel.
- **State Management**: Using the native React Context API (`FinanceContext`). All states relating to transactions, querying parameters, theming, and user roles are maintained globally to avoid unnecessary prop-drilling or external dependency bloat like Redux.
- **Data Visualization**: Integrated with `Chart.js` (using `react-chartjs-2`) to provide dynamic doughnut and line chart canvases. 
- **Icons & Tooling**: Beautiful, consistent SVGs provided by `lucide-react`, and robust time format manipulation provided by `date-fns`.

## 💻 Setup Instructions

To get the front-end running locally:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/isubinkr/finDash.git
   cd finDash
   ```

2. **Install project dependencies**
   ```bash
   npm install
   ```

3. **Run the local development server**
   ```bash
   npm run dev
   ```

4. **View the App**
   Open your browser and navigate to the local server URL provided in your terminal (usually `http://localhost:5173/`).

```
