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
        //#900
        'sherpa-blue': {
          '50': '#eefffd',
          '100': '#c4fffc',
          '200': '#89fff9',
          '300': '#46fff6',
          '400': '#10f1ea',
          '500': '#00d4d0',
          '600': '#00abab',
          '700': '#008688',
          '800': '#04686b',
          '900': '#084d4f',
          '950': '#003236',
        },
        // #400
        'antique-brass': {
          '50': '#f9f5f1',
          '100': '#eee2d7',
          '200': '#dcc0ab',
          '300': '#ca9d7f',
          '400': '#bf8464',
          '500': '#b2684e',
          '600': '#9d5142',
          '700': '#833f3a',
          '800': '#6c3434',
          '900': '#5a2d2e',
          '950': '#321616',
        },
        // #200
        'pancho': {
          '50': '#fdf7ef',
          '100': '#f9ecdb',
          '200': '#f1d1aa',
          '300': '#ebbb86',
          '400': '#e29755',
          '500': '#db7a34',
          '600': '#cd6329',
          '700': '#aa4d24',
          '800': '#883e24',
          '900': '#6e3520',
          '950': '#3b1a0f',
        },


      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

    plugin(function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--primary': theme('colors.sherpa-blue.900'),
          '--primary-hover': theme('colors.sherpa-blue.950'),
          '--primary-contrast': theme('colors.white'),
          '--secondary': theme('colors.sherpa-blue.900'),
          '--secondary-hover': theme('colors.sherpa-blue.950'),
          '--secondary-contrast': theme('colors.white'),
          '--accent': theme('colors.pancho.200'),
          '--accent-contrast': theme('colors.sherpa-blue.900'),
          '--background-light': theme('colors.antique-brass.400'),
          '--background-dark': theme('colors.antique-brass.400'),
          '--foreground-light': theme('colors.sherpa-blue.900'),
          '--foreground-dark': theme('colors.sherpa-blue.900'),
          '--highlight-dark': theme('colors.antique-brass.600'),
          '--highlight-light': theme('colors.antique-brass.600'),
          '--disabled': theme('colors.pancho.200'),
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
