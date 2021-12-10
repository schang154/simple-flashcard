import { createTheme } from '@mui/material/styles';

const primaryColor = { 
    'main': '#ced7db', 
    'light': '#ffffff',
    'dark': '#9da6a9',
    'contrastText': '#000000'
};

const secondaryColor = { 
    'main': '#546e7a', 
    'light': '#819ca9',
    'dark': '#29434e',
    'contrastText': '#ffffff'
};

const theme = createTheme({
    palette: {
      primary: {
        light: primaryColor.light,
        main: primaryColor.main,
        dark: primaryColor.dark,
        contrastText: primaryColor.contrastText,
      },
      secondary: {
        light: secondaryColor.light,
        main: secondaryColor.main,
        dark: secondaryColor.dark,
        contrastText: secondaryColor.contrastText,
      },
    },
  });

export default theme;