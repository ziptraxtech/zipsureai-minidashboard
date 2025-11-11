/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 2s infinite',
        'shine': 'shine 1.2s ease-in-out',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(0)', opacity: '0' },
          '30%': { opacity: '0.6' },
          '100%': { transform: 'translateX(140%)', opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}
