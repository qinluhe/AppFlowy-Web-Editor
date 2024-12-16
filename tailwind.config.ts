// eslint-disable-next-line @typescript-eslint/no-require-imports
const colors = require('./colors.json');

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};