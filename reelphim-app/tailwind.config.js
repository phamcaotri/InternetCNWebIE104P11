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
      Light: {
        primary: {
          DEFAULT: '#E50914',
          dark: '#8B0000',
          light: '#E50914',
          hover: '#C00000',
        },
        primary: {
          DEFAULT: '#E50914',
          dark: '#8B0000',
          light: '#E50914',
          hover: '#C00000',
        },
        secondary: {
          DEFAULT: '#F5F5F5',
          light: '#E5E5E5',
          hover: '#DADADA',
          gray: '#2E2E32',
          placeholder: '#94979F',
        },
        accent: {
          DEFAULT: '#1A1A1E',
          dark: '#2E2E32',
          hover: '#0A0A0E',
        },
        background: {
          DEFAULT: '#FFFFFF',
          light: '#F5F5F5',
          hover: '#EFEFEF',
        },
        text: {
          DEFAULT: '#0F0F0F',
          muted: '#5F5F5F',
          hover: '#000000',
        },
      },
      fontFamily: {
        reelphim: ['Reelphim', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
