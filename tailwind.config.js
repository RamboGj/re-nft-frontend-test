/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--montserrat-font)', 'sans-serif'],
        poppins: ['var(--poppins-font)', 'sans-serif'],
      },

      colors: {
        pink600: '#BE0B5F',
        pink500: '#E31C79',
        pink400: '#FF56A5',
        pink300: '#FF7EBB',

        gray900: '#1E1E1E',
        gray800: '#2D2D2D',
        gray700: '#3E3E3E',
        gray600: '#515151',
        gray500: '#656565',
        gray400: '#878787',
        gray300: '#999999',
        gray200: '#B0B0B0',
      },
    },
  },
  plugins: [],
}
