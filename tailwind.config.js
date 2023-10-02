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
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
    },
    animation: {
      animeLeft: 'animeLeft 1s ease-in-out forwards',
      wiggle: 'wiggle 1s ease-in-out forwards',
    },
    content: {
      play: "url('/src/Assets/i-play.svg')",
    },

    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { min: '768px', max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { min: '640px', max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
};
export const plugins = [];
