import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Link, navigate } from "gatsby";
import { useDispatch } from "react-redux";
import { useLocation } from "@reach/router";
import { LOGOUT } from "../../../constants/actionTypes";
import decode from "jwt-decode";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch({ type: LOGOUT });
    setUser(null);
    navigate("/");
  }, [dispatch]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      const userExpiryTime = decodedToken.exp * 1000;
      const timeout = userExpiryTime - new Date().getTime();
      const logout = setTimeout(() => {
        logOut();
      }, timeout);

      if (userExpiryTime < new Date().getTime()) logOut();
      return () => clearTimeout(logout);
    }

    if (typeof window !== "undefined") {
      !user && setUser(JSON.parse(localStorage.getItem("userProfile")));
    }
  }, [user, location, logOut]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="go to index"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="go to flashcard"
            sx={{ mr: 2, display: { xs: "inherit", sm: "none" } }}
            onClick={() => {
              navigate("/app/");
            }}
          >
            <NoteOutlinedIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/app"
            variant="h6"
            noWrap
            sx={{
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              "&:visited": { color: "inherit" },
              "&:hover": {
                color: "#000",
              },
            }}
          >
            Flash Card
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <>
              <Box sx={{ display: { xs: "flex" }, alignItems: "center" }}>
                <Typography
                  variant="h6"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  Hi, {user.result.name}
                </Typography>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="logout"
                  aria-haspopup="true"
                  onClick={logOut}
                  color="inherit"
                >
                  <LogoutIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <Typography
              component={Link}
              variant="h6"
              to="/app/login"
              sx={{
                textDecoration: "none",
                "&:visited": { color: "inherit" },
                "&:hover": {
                  color: "#000",
                },
              }}
            >
              Login
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
