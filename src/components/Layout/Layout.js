import React from "react";

import theme from "../../theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "../Navbar/Navbar";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../../reducers";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Layout = ({ pageTitle, children }) => {
  const store = createStore(reducers, compose(applyMiddleware(thunk)));
  const year = new Date().getFullYear();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <title>{pageTitle}</title>
        <Navbar />
        <Container sx={{ mb: 9, pt: 5, minWidth: "320px" }}>{children}</Container>
        <Container
          component="footer"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 9,
          }}
        >
          <CopyrightIcon />
          {year} Shih-Hung Chang
        </Container>
      </ThemeProvider>
    </Provider>
  );
};
export default Layout;
