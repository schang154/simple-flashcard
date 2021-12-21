import { createTheme, alpha } from '@mui/material/styles';

const primaryColor = { 
    'main': '#bbdefb', 
    'light': '#eeffff',
    'dark': '#8aacc8',
    'contrastText': '#37474f'
};

const secondaryColor = { 
    'main': '#e8eaf6', 
    'light': '#ffffff',
    'dark': '#b6b8c3',
    'contrastText': '#37474f'
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
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: primaryColor.contrastText
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: alpha("#000", 0.10)
            }
          },
        }
      },
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            "&:hover": {
              color: secondaryColor.light
            }
          },
          containedSecondary: {
            "&:hover": {
              color: secondaryColor.light
            }
          }
        }
      }
    }
  });

export default theme;