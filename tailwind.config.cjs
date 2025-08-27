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
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

    plugin(function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--primary': theme('colors.primary.900'),
          '--primary-hover': theme('colors.primary.700'),
          '--primary-contrast': theme('colors.light-100'),
          '--secondary': theme('colors.light.300'),
          '--secondary-hover': theme('colors.light.500'),
          '--secondary-contrast': theme('colors.dark.950'),
          '--accent': theme('colors.light.300'),
          '--accent-contrast': theme('colors.dark.950'),
          '--background-light': theme('colors.light.300'),
          '--background-dark': theme('colors.light.300'),
          '--foreground-light': theme('colors.dark.950'),
          '--foreground-dark': theme('colors.dark.950'),
          '--highlight-dark': theme('colors.light.500'),
          '--highlight-light': theme('colors.light.500'),
          '--disabled': theme('colors.gray.500'),
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
