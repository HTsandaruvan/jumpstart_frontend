/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [{
      mytheme: {
      
"primary": "#17BBC4",
      
"secondary": "#eaa6e7",
      
"accent": "#cc4f30",
      
"neutral": "#312032",
      
"base-100": "#f2f2f3",
      
"info": "#8db7e8",
      
"success": "#1fc170",
      
"warning": "#f2a745",
      
"error": "#f75f62",
      },
    },],
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

