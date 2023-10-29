/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },

    // dvh: dynamic viewport height unit: suitable for modern mobile browsers
    extend: {
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
