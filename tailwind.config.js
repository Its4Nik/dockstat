// tailwind.config.js
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    container: {
      center: true,
      screens: {
        sm: '90%',
        md: '90%',
        lg: '90%',
        xl: '90%',
        '2xl': '90%',
      },
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "nord", "dracula", "sunset", "night", "black", "valentine", "forest", "business"],
  },
};
