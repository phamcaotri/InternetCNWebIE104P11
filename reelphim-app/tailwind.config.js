module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary-default)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
          hover: 'var(--color-primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary-default)',
          light: 'var(--color-secondary-light)',
          hover: 'var(--color-secondary-hover)',
          gray: 'var(--color-secondary-gray)',
          placeholder: 'var(--color-secondary-placeholder)',
        },
        accent: {
          DEFAULT: 'var(--color-accent-default)',
          dark: 'var(--color-accent-dark)',
          hover: 'var(--color-accent-hover)',
        },
        background: {
          DEFAULT: 'var(--color-background-default)',
          light: 'var(--color-background-light)',
          hover: 'var(--color-background-hover)',
        },
        text: {
          DEFAULT: 'var(--color-text-default)', 
          muted: 'var(--color-text-muted)',
          hover: 'var(--color-text-hover)',
          special: 'var(--color-text-special)',
        },
      },
      fontFamily: {
        reelphim: ['Reelphim', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

// DEFAULT: '#E50914',
// light: '#FF1A1A',
// dark: '#CC0000',
// hover: '#FF0000',
// },
// neutral: {
// 50: '#FAFAF9',  // trắng ngà nhạt
// 100: '#F5F5F4', // trắng ngà
// 200: '#E7E5E4',
// 300: '#D6D3D1',
// 400: '#A8A29E',
// 500: '#78716C',
// 600: '#57534E',
// 700: '#44403C',
// 800: '#292524', // đen than nhạt
// 900: '#1C1917', // đen than đậm
// },
// surface: {
// light: '#FAFAF9',  // light mode background
// dark: '#1C1917',   // dark mode background
// },
// text: {
// light: '#1C1917',  // light mode text
// dark: '#F5F5F4',   // dark mode text
// muted: '#78716C',
// hover: '#E50914',