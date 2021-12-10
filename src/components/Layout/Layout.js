import React from 'react'
import Navbar from "../Navbar/Navbar";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../../theme/theme";



const Layout = ({ pageTitle, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <title>{pageTitle}</title>
      <Navbar />
      <main>
        {children}
      </main>
    </ThemeProvider>  
  )
}
export default Layout