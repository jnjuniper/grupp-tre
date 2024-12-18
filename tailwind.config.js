/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/*.ejs", "./node_modules/flowbite/**/*.js"], 
    theme: {
      extend: {},
      plugins: [
        require('flowbite/plugin')
      ]
    },
    spacing: {
      '2': '0.5rem',
      '4': '1rem',
    },
    fontSize: {
      xs: '0.75rem',
      lg: '1.125rem',
    },
    colors: {
      gray: {
        100: '#f2f2f2',
        300: '#ccc',
        700: '#333',
      },
    },
    plugins: [
      {
        tailwindcss: {},
        autoprefixer: {},
      },
    ],
  };