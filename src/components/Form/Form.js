import React, { useState, useEffect, useCallback } from "react";

import {
  TextField,
  Button,
  Typography,
  Paper,
  // Collapse,
  // Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  // Box
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { useSelector, useDispatch } from "react-redux";
import { createCard, updateCard } from "../../actions/cards";

const TextFieldStyle = {
  my: 1,
};

const ButtonStyle = {
  my: 0.5,
};

const Form = ({ currentCardId, setCurrentCardId, edit, setIsEdit, isOneCard, isAll }) => {
  const [scrollLocation, setScrollLocation] = useState(window.pageYOffset);
  const [isExpanded, setIsExpanded] = useState(true);
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

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const clear = useCallback(() => {
    setCurrentCardId(null);
    setIsEdit(false);
    setCardData({
      frontMessage: "",
      backMessage: "",
      tags: "",
    });
  },[setCurrentCardId, setIsEdit, setCardData]);
  
  const handleScroll = useCallback(() => {
    setScrollLocation(window.pageYOffset);
    if (window.pageYOffset === 0 && !isOneCard && isAll) {
      setIsExpanded(true)
    } else {
      setIsExpanded(false);
      clear();
    }
  },[isAll, isOneCard, clear, setIsExpanded, setScrollLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCardId) {
      dispatch(updateCard(currentCardId, cardData));
    } else {
      dispatch(createCard(cardData));
    }
    clear();
  };
  
  useEffect(() => {
    if (card) setCardData(card);
  }, [card]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll,scrollLocation]);

  useEffect(() => {
    edit && setIsExpanded(true);
  }, [edit]);

  return (
    <Paper elevation={3}>
      {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}> */}
      <Accordion expanded={isExpanded} onClick={handleExpand}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="card-form"
        >
          <Typography variant="h6">
            {currentCardId ? "Editing" : "Making"} a flashcard...
          </Typography>
        </AccordionSummary>
        {/* <Button
          onClick={handleExpand}
          aria-expanded={isExpanded}
          aria-label="show more"
          color="secondary"
          sx={{ justifyContent: "end" }}
        >
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button> */}
      {/* </Box> */}
      {/* <Collapse in={isExpanded} timeout="auto"> */}
        <AccordionDetails>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <TextField
              name="frontMessage"
              variant="outlined"
              label="Front Message"
              fullWidth
              sx={TextFieldStyle}
              value={cardData.frontMessage}
              onChange={(e) => {
                setCardData({ ...cardData, frontMessage: e.target.value });
              }}
            />
            <TextField
              name="backMessage"
              variant="outlined"
              label="Back Message"
              fullWidth
              sx={TextFieldStyle}
              value={cardData.backMessage}
              onChange={(e) => {
                setCardData({ ...cardData, backMessage: e.target.value });
              }}
            />
            <TextField
              name="tags"
              variant="outlined"
              label="Tags"
              fullWidth
              sx={TextFieldStyle}
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
              sx={ButtonStyle}
              aria-label="submit form"
            >
              {edit ? "Update" : "Submit"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={clear}
              fullWidth
              sx={ButtonStyle}
              aria-label="clear form"
            >
              Clear
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
      {/* </Collapse> */}
    </Paper>
  );
};

export default Form;
