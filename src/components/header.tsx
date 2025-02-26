import { Link } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="container mx-auto px-4 py-8 border-b border-gray-200 dark:border-gray-900">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/" className="font-medium text-lg lg:text-2xl">
            WeatherX
          </Link>
        </div>
        <span
          className={`${
            theme === "dark"
              ? "transition-all rotate-180 inline-block cursor-pointer"
              : "transition-all rotate-0 inline-block cursor-pointer"
          }`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] text-blue-500" />
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;
