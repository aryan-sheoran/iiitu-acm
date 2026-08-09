/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        acm: {
          blue: '#005A9C',
          dark: '#004070',
          light: '#E6F0FA',
        },
        iiitu: {
          gold: '#A4673D',
          light: '#FAF2C7',
          dark: '#7A4A28',
        }
      }
    },
  },
  plugins: [],
}
