/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'azure-radiance': {
          '50': '#f0faff',
          '100': '#e0f4fe',
          '200': '#b9eafd',
          '300': '#7ddfff',
          '400': '#38c7ff',
          '500': '#0eabf4',
          '600': '#0089d5',
          '700': '#006eac',
          '800': '#005a8c',
          '900': '#004b73',
          '950': '#002c44',
        },
        'primary': '#0eabf4',
        'primary-dark': '#0089d5',
        'dark-bg': '#0D1117',
        'dark-card': '#161B22',
      },
      fontFamily: {
        arabic: ['"Noto Sans Arabic"', "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
