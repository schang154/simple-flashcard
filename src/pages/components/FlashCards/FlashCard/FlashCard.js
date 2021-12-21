import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as FlashCardStyles from "./FlashCard.module.css";
import { deleteCard, favoriteCard } from "../../../../actions/cards";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardContent,
  CardActionArea,
  Button,
  Typography,
} from "@mui/material";
import theme from "../../../../theme/theme";

const FlashCard = ({ card, setCurrentCardId, setIsEdit }) => {
  const [isFlip, setIsFlip] = useState(false);
  const [isFavorite, setIsFavorite] = useState(card.favorite);
  const path = typeof window !== "undefined" && window.location.pathname;
  const dispatch = useDispatch();

  const handleFlip = () => setIsFlip((prevState) => !prevState);

  const handleEdit = () => {
    if (path !== "/") {
      setCurrentCardId(card._id);
      setIsEdit(true);
      window.scrollTo(0,0);
    }
  };

  const handleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
    if (path !== "/") {
      dispatch(favoriteCard(card._id));
    }
  };

  const handleDelete = () => {
    if (path !== "/") {
      dispatch(deleteCard(card._id));
    }
  };

  return (
    <div className={FlashCardStyles.cardContainer}>
      <div
        className={isFlip ? FlashCardStyles.hide : FlashCardStyles.moreEditIcon}
      >
        <Button
          onClick={handleEdit}
          sx={{
            fontSize: { xs: 10, sm: 14 },
            color: theme.palette.secondary.main,
          }}
        >
          <EditIcon fontSize="medium" />
        </Button>
      </div>
      <div
        className={
          isFlip
            ? `${FlashCardStyles.cardBody} ${FlashCardStyles.flip}`
            : FlashCardStyles.cardBody
        }
      >
        <Card
          onClick={handleFlip}
          className={
            isFlip
              ? `${FlashCardStyles.card} ${FlashCardStyles.sideFront} 
               ${FlashCardStyles.flipFront}`
              : `${FlashCardStyles.card} ${FlashCardStyles.sideFront}`
          }
          elevation={8}
        >
          <CardActionArea className={FlashCardStyles.cardContent}>
            <CardContent>
              <Typography variant="h6">{card.frontMessage}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={handleFlip}
          className={`${FlashCardStyles.card} ${FlashCardStyles.sideBack}`}
          elevation={8}
        >
          <CardActionArea className={FlashCardStyles.cardContent}>
            <CardContent>
              <Typography variant="h6">{card.backMessage}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <div className={isFlip ? FlashCardStyles.hide : FlashCardStyles.bottomRow }>
        <div
          className={FlashCardStyles.tagContainer}
        >
          <Typography variant="caption" display="block" color="GrayText">
            {card.tags.length >= 1 &&
              card.tags[0] !== "" &&
              card.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <div
          className={FlashCardStyles.bottomIcon}
        >
          <Button
            onClick={handleFavorite}
            sx={{
              fontSize: { xs: 10, sm: 14 },
              color: theme.palette.secondary.main,
              py: { xs: 0, sm: 1 }
            }}
          >
            {isFavorite ? (
              <FavoriteIcon fontSize="medium" />
            ) : (
              <FavoriteBorderIcon fontSize="medium" />
            )}
            Favorite
          </Button>

          <Button
            sx={{
              fontSize: { xs: 10, sm: 14 },
              color: theme.palette.secondary.main,
              py: { xs: 0, sm: 1 }
            }}
            onClick={handleDelete}
          >
            <DeleteIcon fontSize="medium" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
