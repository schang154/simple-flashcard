import React from "react";
import reducers from "../../reducers";
import theme from "../../theme/theme";
import Navbar from "../Navbar/Navbar";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Container, Link } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CopyrightIcon from "@mui/icons-material/Copyright";
import GitHubIcon from '@mui/icons-material/GitHub';

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
          sp
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 9,
          }}
        >
          <CopyrightIcon />
          {year}&nbsp;Shih-Hung Chang&nbsp;
          <Link color="#000" href="https://github.com/schang154/simple-flashcard"><GitHubIcon /></Link>
        </Container>
      </ThemeProvider>
    </Provider>
  );
};
export default Layout;
