/** @type {import('tailwindcss').Config} */
import { config } from 'dotenv';
config();

export default {
  darkMode: 'class',
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
        'screen-max-395': 'calc(100vh - 395px)',
      },
      colors: {
        'white': '#ffffff',
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'dark-gray-light': '#303134',
        'dark-gray': '#1F1F1F',
        'dark': '#020617',
      },
    }
  },
  plugins: [],
}


