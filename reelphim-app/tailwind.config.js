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
