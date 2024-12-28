import type { Config } from 'tailwindcss';

const colors = require('tailwindcss/colors');

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      white: colors.white,
      // 파란색
      navy: {
        50: '#E5F0FF',
        100: '#B7D5FF',
        200: '#8ABBFF',
        300: '#5CA0FF',
        400: '#2E86FF',
        500: '#006BFF',
        600: '#005AD6',
        700: '#0049AD',
        800: '#003885',
        900: '#00275C',
      },
      gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
      red: {
        50: '#FFECEC',
        100: '#FFC2C2',
        200: '#FF9797',
        300: '#FF6D6D',
        400: '#FF4343',
        500: '#DD2F2F',
        600: '#BB1F1F',
        700: '#991212',
        800: '#770808',
        900: '#550101',
      },
      yellow: {
        200: '#FFECCE',
        400: '#FFB300',
        600: '#FF6F00',
      },
      green: {
        200: '#C8E6C9',
        400: '#66BB6A',
        600: '#2E7D32',
      },
      kakao: '#FEE500',
    },
  },
  plugins: [],
};
export default config;
