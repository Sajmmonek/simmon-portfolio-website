module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito']
      },
      spacing: {
        '84': '21rem',
        '108': '27rem',
        '112': '28rem',
        '136': '34rem'
      },
    },
    screens: {
      'exsm': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
}
