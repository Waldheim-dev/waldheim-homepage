const plugin = require('tailwindcss/plugin');


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'wd': {
            '50': '#f2f7f3',
            '100': '#dfece0',
            '200': '#c1d9c5',
            '300': '#97bea0',
            '400': '#6b9e78',
            '500': '#498059',
            '600': '#366544',
            '700': '#2b5138',
            '800': '#24412e',
            '900': '#1e3626',
            '950': '#101e16',
        },
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),

    plugin(function({ addBase, theme }) {
      addBase({

        ':root': {
          '--primary': theme('colors.wd.500'),
          '--primary-hover': theme('colors.wd.700'),
          '--primary-contrast': theme('colors.white'),
          '--secondary': theme('colors.wd.400'),
          '--secondary-hover': theme('colors.wd.500'),
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
