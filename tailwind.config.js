/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0B7A75', light: '#14A89E', dark: '#065A57' },
        secondary: { DEFAULT: '#D4A843', light: '#E8C672' },
        body: '#2B2D42',
        'body-light': '#555B6E',
        'body-muted': '#8D99AE',
        'bg': '#F7F9FA',
        'bg-alt': '#EDF2F4',
        'border': '#D6DCE5',
      },
      fontFamily: {
        heading: ['Raleway', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
