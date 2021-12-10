import React from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import FlashCard from "./FlashCard/FlashCard";

const FlashCards = ({ setCurrentCardId }) => {
  const cards = useSelector((state) => state.cards);
  console.log("getting cards", cards);

  return !cards.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={4} marginBottom={8} paddingX={3}>
        {cards.map((card, index) => (
          <Grid key={index} item xs={12} md={6}>
            <FlashCard card={card} setCurrentCardId={setCurrentCardId} />
          </Grid>
        ))}
    </Grid>
  );
};

export default FlashCards;
