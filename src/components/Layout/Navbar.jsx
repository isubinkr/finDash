import { useFinance } from "../../context/FinanceContext";
import { Moon, Sun, Wallet, Shield, ShieldCheck } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme, role, toggleRole } = useFinance();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 w-full transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-brand-500 text-white p-2 rounded-lg">
              <Wallet size={24} />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white hidden sm:block">
              FinDash
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleRole}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                role === "admin"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {role === "admin" ? (
                <ShieldCheck size={16} />
              ) : (
                <Shield size={16} />
              )}
              <span className="capitalize">{role}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
