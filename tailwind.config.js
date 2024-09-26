/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar-bg': '#fefeff',
        'highlight-yellow': '#eeb004',
        'icon-gray': '#818181',
        'hover-bg': '#e3e3e3',
        'primary-100': '#EEE3FF',
        'primary-600': '#8054C7',
        'primary-700': '#5A3696',
        'active-heart': '#53C629',
      },
      animation: {
        'spin-fast': 'spin 1s infinite linear',
      },
      spacing: {
        '88': '22rem',
        '23': '4.6875rem',
      },
      width: {
        '81': '23.4375rem',
        '86': '21.4375rem',
      },
      padding: {
        '3.2': '0.8125rem',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
        },
        '.scrollbar-none::-webkit-scrollbar': {
          'display': 'none',
        },
      })
    },
  ],
}

