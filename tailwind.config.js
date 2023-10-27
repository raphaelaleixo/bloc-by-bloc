const plugin = require('tailwindcss/plugin')

const backfaceVisibility = plugin(function({addUtilities}) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    }
  })
});

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
      fontFamily: {
        saira: ['var(--font-saira)'],
        saira_stencil: ['var(--font-saira-stencil)'],
      },
      colors: {
        'black': '#050505'
      }
    },
  },
  plugins: [backfaceVisibility],
};

