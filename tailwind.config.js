/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{html,js,ts,jsx,tsx}'];
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
        '0%': {
          opacity: 0,
          transform: 'translateY(-20px)',
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0px)',
        },
      },
      animeTop: {
        '0%': {
          opacity: 0.5,
          transform: 'translateY(20px)',
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0px)',
        },
      },
      animeRight: {
        '0%': {
          opacity: 0,
          transform: 'translateX(20px)',
        },
        '100%': {
          opacity: 1,
          transform: 'translateX(0px)',
        },
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
      animeDown: 'animeDown 1s ease-in-out forwards',
      animeTop: 'animeTop 1s ease-in-out forwards',
      wiggle: 'wiggle 1s ease-in-out forwards',
      scaleItem: 'scaleItem .5s ease-in-out forwards',
      scaleOut: 'scaleOut .5s ease-in-out forwards',
      scaleCard: 'scaleCard .3s ease-in-out forwards',
    },
    content: {
      play: 'url(/src/Assets/i-play.svg)',
      exit: 'url(/src/Assets/i-exit.svg)',
    },
    backgroundImage: {
      login: 'url(/src/Assets/photo_login_l.jpg)',
    },

    screens: {
      desktop: { min: '1024px' },
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

      tm: { min: '0px', max: '480px' }, // Tiny mobile
      // => @media (max-width: 384px) { ... }
    },
  },
};
// eslint-disable-next-line no-undef
export const plugins = [require('tailwind-scrollbar')({ nocompatible: true })];
