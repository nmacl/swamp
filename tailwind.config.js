// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gunmetal: '#2d3142',
        silver: '#bfc0c0',
        white: '#ffffff',
        raspberryRose: '#b6465f',
        amaranthPurple: '#af125a',
      },
    },
  },
  plugins: [],
};