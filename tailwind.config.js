/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      marginTop: {
        '90px': '90px',
      },
      spacing: {
        'screen-minus-395': 'calc(100vh - 395px)',
      },
    }
  },
  plugins: [],
}


