import React, { useState } from "react";
import Card from "@mui/material/Card";
// import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as FlashCardStyles from "./FlashCard.module.css";
import { CardActionArea } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import { deleteCard, favoriteCard } from "../../../actions/cards";

const FlashCard = ({ card, setCurrentCardId }) => {
  const [isFlip, setIsFlip] = useState(false);
  const [isFavorite, setIsFavorite] = useState(card.favorite);
  const dispatch = useDispatch();
  const handleFlip = () => setIsFlip(!isFlip);
  const handleEdit = () => {
    setCurrentCardId(card._id);
  };
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    dispatch(favoriteCard(card._id));
  };
  const handleDelete = () => dispatch(deleteCard(card._id));

  return (
    <div className={FlashCardStyles.cardContainer}>
      <div
        className={isFlip ? FlashCardStyles.hide : FlashCardStyles.moreEditIcon}
      >
        <Button onClick={handleEdit}>
          <MoreHorizIcon fontSize="medium" />
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
        >
          <CardActionArea className={FlashCardStyles.cardContent}>
            <CardContent>
              <Typography variant="h6">{card.backMessage}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <div className={isFlip ? FlashCardStyles.hide : FlashCardStyles.tagContainer}>
          <Typography variant="caption" display="block" color="GrayText">
            {(card.tags.length >= 1 && card.tags[0] !== "") && card.tags.map((tag) => `#${tag} `)}
          </Typography>
      </div>
      <div
        className={isFlip ? FlashCardStyles.hide : FlashCardStyles.bottomIcon}
      >
        <Button onClick={handleFavorite}>
          {isFavorite ? (
            <FavoriteIcon fontSize="medium" />
          ) : (
            <FavoriteBorderIcon fontSize="medium" />
          )}
          Favorite
        </Button>

        <Button onClick={handleDelete}>
          <DeleteIcon fontSize="medium" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default FlashCard;
