module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E50914',
          dark: '#8B0000',
          light: '#E50914',
          hover: '#C00000',
        },
        secondary: {
          DEFAULT: '#2A2A2A',
          light: '#3A3A3A',
          hover: '#454545',
          gray: '#D1D1CD',
          placeholder: '#6b7280',
        },
        accent: {
          DEFAULT: '#E5E5E1',
          dark: '#D1D1CD',
          hover: '#F5F5F1',
        },
        background: {
          DEFAULT: '#1A1A1A',
          light: '#252525',
          hover: '#303030',
        },
        text: {
          DEFAULT: '#F0F0F0',
          muted: '#A0A0A0',
          hover: '#FFFFFF',
        },
      },
      fontFamily: {
        reelphim: ['Reelphim', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
