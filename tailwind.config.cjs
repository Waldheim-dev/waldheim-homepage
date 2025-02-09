const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        tilt: 'tilt 3s linear infinite',
        spin_right: 'spin_right 3s linear infinite',
        spin_right_fast: 'spin_right 2s linear infinite',
        spin_left: 'spin_left 3s linear infinite',
        rotate_gradient: 'rotate_gradient 5s linear infinite',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1.5deg)' },
          '75%': { transform: 'rotate(-1.5deg)' },
        },
        spin_right: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spin_left: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-180deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        }
      },
      colors: {
        wd: {
          50: '#f2f7f3',
          100: '#dfece0',
          200: '#c1d9c5',
          300: '#97bea0',
          400: '#6b9e78',
          500: '#498059',
          600: '#366544',
          700: '#2b5138',
          800: '#24412e',
          900: '#1e3626',
          950: '#101e16',
        },
        primary: {
          50: '#f5f8f5',
          100: '#ddeae0',
          200: '#bbd4c2',
          300: '#92b69e',
          400: '#6a9779',
          500: '#507c60',
          600: '#3f624d',
          700: '#355040',
          800: '#31473a',
          900: '#29382f',
          950: '#141f19',
        },
        secondary: {
          50: '#edf4f2',
          100: '#dcebe7',
          200: '#b9d6ce',
          300: '#8ebab1',
          400: '#669b91',
          500: '#4c8077',
          600: '#3b6660',
          700: '#32534e',
          800: '#2b4441',
          900: '#273a38',
          950: '#13201f',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

    plugin(function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--primary': theme('colors.emerald.600'),
          '--primary-hover': theme('colors.emerald.800'),
          '--primary-contrast': theme('colors.white'),
          '--secondary': theme('colors.emerald.600'),
          '--secondary-hover': theme('colors.emerald.800'),
          '--secondary-contrast': theme('colors.white'),
          '--accent': theme('colors.slate.500'),
          '--accent-contrast': theme('colors.slate.100'),
          '--background-light': theme('colors.white'),
          '--background-dark': theme('colors.slate.800'),
          '--foreground-light': theme('colors.gray.300'),
          '--foreground-dark': theme('colors.slate.900'),
          '--highlight-dark': theme('colors.slate.700'),
          '--highlight-light': theme('colors.gray.200'),
          '--disabled': theme('colors.gray.400'),
        },
        '.prose': {
          maxWidth: '100% !important',
        },

        '.flip-card': {
          transform: 'rotateY(0)',
          transition: 'transform 1s',
          perspective: '1000px',
          position: 'relative',
          '.flip-card-inner': {
            position: 'relative',
            transform: 'rotateY(0)',
            transition: 'transform 1s',
            width: '100%',
            transformStyle: 'preserve-3d',
            '.flip-front, .flip-back': {
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0) translateZ(1px)',
            },
            '.flip-back': {
              position: 'absolute',
              inset: 0,
              transform: 'rotateY(180deg) translateZ(1px)',
            },
          },
          '&:hover': {
            '.flip-card-inner': {
              transform: 'rotateY(180deg)',
              transition: 'transform 1s',
            },
          },
        },
      });
    }),
  ],
};
