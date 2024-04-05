const plugin = require('tailwindcss/plugin');


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),

    plugin(function({ addBase, theme }) {
      addBase({

        ':root': {
          '--primary': theme('colors.indigo.600'),
          '--primary-hover': theme('colors.indigo.700'),
          '--primary-contrast': theme('colors.white'),
          '--secondary': theme('colors.indigo.500'),
          '--secondary-hover': theme('colors.indigo.600'),
          '--secondary-contrast': theme('colors.white'),
          '--accent': theme('colors.slate.500'),
          '--accent-contrast': theme('colors.slate.100'),
          '--background-light': theme('colors.white'),
          '--background-dark': theme('colors.slate.800'),
          '--foreground-light': theme('colors.gray.300'),
          '--foreground-dark': theme('colors.slate.700'),
          '--highlight-dark': theme('colors.gray.700'),
          '--highlight-light': theme('colors.gray.200'),
          '--disabled': theme('colors.gray.400')
        },

        '.flip-card': {
          transform: 'rotateY(0)',
          transition: 'transform 1s',
          perspective: '1000px',
          '.flip-card-inner': {
            position: 'relative',
            transform: 'rotateY(0)',
            transition: 'transform 1s',
            transformStyle: 'preserve-3d',
            '.flip-front, .flip-back': {
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0) translateZ(1px)',
            },
            '.flip-back': {
              position: 'absolute',
              left: '5%',
              top: '50%',
              transform: 'rotateY(180deg) translate(-25%, -50%) translateZ(1px)',
            }
          },
          '&:hover': {
            '.flip-card-inner': {
              transform: 'rotateY(180deg)',
              transition: 'transform 1s',
            }
          }
        }
      });
    })
  ]
};
