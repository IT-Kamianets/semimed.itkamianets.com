/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#effefb',
          100: '#c7fff4',
          200: '#90ffe9',
          300: '#51f7da',
          400: '#1de4c5',
          500: '#0B7A75',
          600: '#069E8C',
          700: '#0B7A75',
          800: '#0E5F5C',
          900: '#065A57',
          950: '#003332',
          DEFAULT: '#0B7A75',
          light: '#14A89E',
          dark: '#065A57',
        },
        secondary: {
          50: '#fdfaed',
          100: '#f9f0cc',
          200: '#f2df94',
          300: '#eacb5d',
          400: '#e4b83a',
          500: '#D4A843',
          600: '#b88425',
          700: '#996320',
          800: '#7d4f21',
          900: '#67411f',
          DEFAULT: '#D4A843',
          light: '#E8C672',
        },
        sage: {
          50: '#f6f7f5',
          100: '#e8ebe5',
          200: '#d4d9ce',
        },
        body: '#2B2D42',
        'body-light': '#555B6E',
        'body-muted': '#8D99AE',
        'bg': '#F8FAFB',
        'bg-alt': '#EDF2F4',
        'bg-warm': '#FBF9F6',
        'border': '#E2E8F0',
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 40px -10px rgba(11, 122, 117, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 20px 60px -15px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(11, 122, 117, 0.3)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
