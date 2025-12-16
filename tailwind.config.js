/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#7C4DFF", // Violet
          secondary: "#C158FF", // Magenta
          accent: "#FFB84C", // Gold
          peach: "#F29F7E",
          deep: "#3B2C6E",
          bgLight: "#F7F7F7",
          bgDark: "#050312",
          textLight: "#FFFFFF",
          textDark: "#111827",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15,23,42,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      fontFamily: {
        arabic: ['"Noto Sans Arabic"', "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
