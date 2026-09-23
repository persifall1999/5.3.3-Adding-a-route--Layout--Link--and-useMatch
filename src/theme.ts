import { createTheme, type MantineColorsTuple } from '@mantine/core';

const indigoPallete: MantineColorsTuple = [
  '#EDF2FF', 
  '#DBE4FF', 
  '#BAC8FF', 
  '#91A7FF', 
  '#748FFC', 
  '#5C7CFA', 
  '#4263EB', // - Primary
  '#3B5BDB', 
  '#364FC7', // - Dark Primary
  '#2B3A8F', 
]

export const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'indigo',

  colors: {
    indigo: indigoPallete,

    black1: [
      '#0F0F10', '#0F0F10', '#0F0F10', '#0F0F10', '#0F0F10', 
      '#0F0F10', '#0F0F10', '#0F0F10', '#0F0F10', '#0F0F10'
    ],

    appBackground: [
      '#F6F6F7', '#F6F6F7', '#F6F6F7', '#F6F6F7', '#F6F6F7', 
      '#F6F6F7', '#F6F6F7', '#F6F6F7', '#F6F6F7', '#F6F6F7'
    ],
  },
});

