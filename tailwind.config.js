/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    'bg-emerald-100',
    'bg-orange-100',
    'bg-yellow-100',
    'bg-pink-100',
    'bg-purple-100',
  ],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#050505'
      }
    },
  },
  plugins: [],
};
