import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createCard, updateCard } from "../../actions/cards";

const Form = ({ currentCardId, setCurrentCardId }) => {
  const [cardData, setCardData] = useState({
    frontMessage: "",
    backMessage: "",
    tags: "",
  });
  const card = useSelector(
    (state) =>
      currentCardId && state.cards.find((card) => card._id === currentCardId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (card) setCardData(card);
  }, [card]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCardId) {
      dispatch(updateCard(currentCardId, cardData));
    } else {
      dispatch(createCard(cardData));
    }
    clear();
  };

  const clear = () => {
    setCurrentCardId(null);
    setCardData({
      frontMessage: "",
      backMessage: "",
      tags: "",
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentCardId ? "Editing" : "Creating"} a Card
        </Typography>
        <TextField
          name="frontMessage"
          variant="outlined"
          label="Front Message"
          fullWidth
          value={cardData.frontMessage}
          onChange={(e) =>
            setCardData({ ...cardData, frontMessage: e.target.value })
          }
        />
        <TextField
          name="backMessage"
          variant="outlined"
          label="Back Message"
          fullWidth
          value={cardData.backMessage}
          onChange={(e) =>
            setCardData({ ...cardData, backMessage: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={cardData.tags}
          onChange={(e) => {
            setCardData({
              ...cardData,
              tags: e.target.value.replace(/ /g, "").split(","),
            });
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
