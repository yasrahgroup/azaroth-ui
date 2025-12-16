import { useTheme } from "../hooks/useTheme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-white/10 dark:bg-black/30 backdrop-blur-sm shadow-soft hover:scale-105 transition"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 text-yellow-300" />
      ) : (
        <MoonIcon className="w-5 h-5 text-brand-primary" />
      )}
    </button>
  );
};

export default ThemeToggle;
