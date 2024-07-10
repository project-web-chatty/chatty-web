/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      body: '#2F3645',
      white: '#FFFFFF',
      black: '#000000',
      orange: '#DD5746',
      purple: '#6562F5',
    },
    fontFamily: {},
    extend: {},
  },
  plugins: [],
};
