/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{html,js,jsx}'];
export const theme = {
  extend: {
    fontFamily: {
      limelight: ['Limelight', 'cursive'],
      roboto: ['Roboto', 'sans-serif'],
      gabarito: ['Gabarito', 'cursive'],
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      scaleCard: {
        '0%': { transform: 'scale(1)' },
        '100%': { transform: 'scale(1.1)' },
      },
      animeDown: {
        '100%': { opacity: 1, transform: 'initial' },
      },
      animeLeft: {
        '0%': {
          opacity: 0,
          transform: 'translateX(-20px)',
        },
        '100%': {
          opacity: 1,
          transform: 'translateX(0px)',
        },
      },
      scaleItem: {
        '0%': {
          opacity: 0,
          transform: 'scale(0)',
        },
        '100%': {
          opacity: 1,
          transform: 'scale(1)',
        },
      },
      scaleOut: {
        '0%': {
          opacity: 1,
          transform: 'scale(1)',
        },
        '100%': {
          opacity: 0,
          transform: 'scale(0)',
        },
      },
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 1s ease-in-out forwards',
      animeLeft: 'animeLeft 1s ease-in-out forwards',
      wiggle: 'wiggle 1s ease-in-out forwards',
      scaleItem: 'scaleItem .7s ease-in-out forwards',
      scaleOut: 'scaleOut .7s ease-in-out forwards',
      scaleCard: 'scaleCard .3s ease-in-out forwards',
    },
    content: {
      play: "url('/src/Assets/i-play.svg')",
      exit: "url('/src/Assets/i-exit.svg')",
    },

    screens: {
      '2xl': { max: '1535px' }, //Large desktop
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' }, // Desktop
      // => @media (max-width: 1279px) { ... }

      lg: { min: '768px', max: '1023px' }, // Tablet / Laptop
      // => @media (max-width: 1023px) { ... }

      cardMD: { min: '0px', max: '1023px' }, // Responsive Card

      md: { min: '640px', max: '767px' }, // Tablet
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }

      tm: { min: '0px', max: '450px' }, // Tiny mobile
      // => @media (max-width: 384px) { ... }
    },
  },
};
export const plugins = [require('tailwind-scrollbar')({ nocompatible: true })];
