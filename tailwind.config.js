/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8BA63A',
          light: '#A3BE52',
          dark: '#728B2E',
        },
        accent: {
          DEFAULT: '#D4764E',
          light: '#E8936C',
          dark: '#C25E36',
        },
        sage: {
          DEFAULT: '#6B9080',
          light: '#89A99A',
          dark: '#567468',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
