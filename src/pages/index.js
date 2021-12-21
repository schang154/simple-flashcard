import React from "react";
import { emphasize } from "@mui/material/styles";
import Layout from "../components/Layout/Layout";
import { Link } from "gatsby";
import FlashCard from "../components/FlashCards/FlashCard/FlashCard";
import { Typography } from "@mui/material";

const IndexPage = () => {
  const user =
    typeof window !== "undefined" && localStorage.getItem("userProfile");
  const path = user === "undefined" ? "/app/login" : "/app";

  const card = {
    frontMessage: "Click Me!",
    backMessage: (
      <Typography
        component={Link}
        variant="h6"
        to={path}
        sx={{
          textDecoration: "none",
          "&:visited": { color: "inherit" },
          "&:hover": {
            fontSize: 25,
            transition: "0.1s font-size ease-in",
            color: emphasize("#000", 0.35),
          },
        }}
      >
        Try the Flash Card App
      </Typography>
    ),
    tags: ["final", "important"],
  };

  return (
    <Layout pageTitle={"Flash Card Homepage"}>
      <Typography variant="h3" align="center" sx={{ mb: 4 }}>
        Welcome to Flashcard!
      </Typography>
      <Typography paragraph align="center">
        The idea is simple. <br /> Write it down and remember.
      </Typography>
      <FlashCard card={card} />
    </Layout>
  );
};

export default IndexPage;
