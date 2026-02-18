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
          '--primary': theme('colors.meg-accent'),
          '--primary-hover': theme('colors.sky.400'),
          '--primary-contrast': '#ffffff',
          '--secondary': theme('colors.meg-surface-dark'),
          '--secondary-hover': theme('colors.meg-surface-dark'),
          '--secondary-contrast': theme('colors.meg-text-primary-dark'),
          '--accent': theme('colors.meg-accent'),
          '--accent-contrast': '#ffffff',
          '--background-light': theme('colors.meg-bg-light'),
          '--background-dark': theme('colors.meg-bg-dark'),
          '--foreground-light': theme('colors.meg-text-primary-light'),
          '--foreground-dark': theme('colors.meg-text-primary-dark'),
          '--highlight-dark': theme('colors.meg-accent'),
          '--highlight-light': theme('colors.meg-accent'),
          '--disabled': theme('colors.slate.500'),
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
