module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E50914',
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
          DEFAULT: '#F5F5F4', // will soon be deprecated
          black: '#1C1917',
          white: '#F5F5F4',
          muted: '#78716C',
          hover: '#FFFFFF',
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

// colors: {
//   primary: {
//     DEFAULT: '#E50914',
//     light: '#FF1A1A',
//     dark: '#CC0000',
//     hover: '#FF0000',
//   },
//   neutral: {
//     50: '#FAFAF9',  // trắng ngà nhạt
//     100: '#F5F5F4', // trắng ngà
//     200: '#E7E5E4',
//     300: '#D6D3D1',
//     400: '#A8A29E',
//     500: '#78716C',
//     600: '#57534E',
//     700: '#44403C',
//     800: '#292524', // đen than nhạt
//     900: '#1C1917', // đen than đậm
//   },
//   surface: {
//     light: '#FAFAF9',  // light mode background
//     dark: '#1C1917',   // dark mode background
//   },
//   text: {
//     light: '#1C1917',  // light mode text
//     dark: '#F5F5F4',   // dark mode text
//     muted: '#78716C',
//     hover: '#E50914',
//   }
// },