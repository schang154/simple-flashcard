import React, { useState, useEffect, useRef, useCallback } from "react";
import FlashCard from "./FlashCard/FlashCard";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Container, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";

const buttonStyle = {
  p: 0,
  borderRadius: "100%",
  minWidth: "40px",
  minHeight: "40px",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 5,
  "&:hover": {
    bgcolor: alpha("#000", 0.05),
  },
};

const ArrowButton = ({ handleClick, component, label, style }) => {
  return (
    <Button sx={style} onClick={handleClick} aria-label={label}>
      {component}
    </Button>
  );
};

const FlashCards = ({ setCurrentCardId, setIsEdit, isAll, cards }) => {
  const [index, setIndex] = useState(0);
  const [movement, setMovement] = useState(null);
  const prevXCoordinate = useRef(window.innerWidth / 2);

  const handleForward = useCallback(() => {
    setIndex((prevIndex) => (cards.length - 1 > prevIndex ? prevIndex + 1 : 0));
  },[cards, setIndex]);

  const handleBackward = useCallback(() => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : cards.length - 1));
  },[cards, setIndex]);

  const handleDown = (e) => {

    if (!isAll) {
      
      const type = e.type;
      switch (type) {
        case "mousedown":
          prevXCoordinate.current = e.clientX;
          break;
        case "touchstart":
          prevXCoordinate.current = e.changedTouches[0].clientX;
          break;
        default:
          break;
      }
    }
  };

  const handleUp = (e) => {

    if (!isAll) {
      let move;

      const type = e.type;
      switch (type) {
        case "mouseup":
          move = e.clientX - prevXCoordinate.current
          break;
        case "touchend":
          move = e.changedTouches[0].clientX - prevXCoordinate.current
          break;
        default:
          break;
      }
      setMovement(move);
    }
  };

  useEffect(() => {
    if (!isAll && movement) {
      movement > 50 && handleBackward() 
      movement < -50 && handleForward();
    }
  }, [isAll, movement, handleBackward, handleForward]);

  if (!cards) {
    return <CircularProgress />;
  } else if (cards.length === 0) {
    return <p>No cards for now.</p>;
  } else {
    return (
      <Container
        sx={{ display: "block", position: "relative" }}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
        onTouchStart={handleDown}
        onTouchEnd={handleUp}
      >
        {!isAll && (
          <ArrowButton
            style={{
              ...buttonStyle,
              left: { xs: "0", sm: "20px" },
            }}
            handleClick={handleBackward}
            component={<ArrowBackIosNewIcon />}
          />
        )}
        {!isAll && (
          <ArrowButton
            style={{
              ...buttonStyle,
              right: { xs: "0", sm: "20px" },
            }}
            handleClick={handleForward}
            component={<ArrowForwardIosIcon />}
          />
        )}
        <Grid container justifyContent="center" spacing={3}>
          {isAll ? (
            cards.map((card, index) => (
              <Grid key={index} item xs={11}>
                <FlashCard
                  card={card}
                  setCurrentCardId={setCurrentCardId}
                  setIsEdit={setIsEdit}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={11}>
              <FlashCard
                card={cards[index]}
                setCurrentCardId={setCurrentCardId}
                setIsEdit={setIsEdit}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    );
  }
};

export default FlashCards;
