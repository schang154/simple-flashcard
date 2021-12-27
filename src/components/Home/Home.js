import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCards } from "../../actions/cards";
import FlashCards from "../FlashCards/FlashCards";
import Form from "../Form/Form";
import {
  Container,
  Switch,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const { cards, isLoading } = useSelector((state) => state.cards);
  const [filteredCard, setFilteredCard] = useState([]);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOneCard, setIsOneCard] = useState(true);
  const [isAll, setIsAll] = useState(false);
  const [tagName, setTagName] = useState("");
  const dispatch = useDispatch();

  const handleCheck = (e) => {
    e.target.checked && setIsOneCard(false);
    setIsAll(e.target.checked);
  };

  const handleSearch = (e) => {
    setTagName(e.target.value);
  };

  useEffect(() => {
    const filteredCards = cards.filter((card) =>
      card.tags.join("").includes(tagName)
    );
    setFilteredCard(filteredCards);
    filteredCards.length === 1 ? setIsOneCard(true) : setIsOneCard(false);
  }, [cards, tagName]);

  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  return (
    <Container component="main" sx={{ textAlign: "center" }}>
      <Form
        currentCardId={currentCardId}
        setCurrentCardId={setCurrentCardId}
        edit={isEdit}
        setIsEdit={setIsEdit}
        isOneCard={isOneCard}
        isAll={isAll}
      />
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          label="Search tags"
          variant="standard"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 7,
            alignItems: "center",
          }}
          onChange={handleSearch}
          aria-label="search tags"
        />
        <Box sx={{ textAlign: "end", my: 3, flex: 3 }}>
          <Switch
            checked={isAll}
            onChange={handleCheck}
            name="all"
            aria-label="show all flashcards"
          />
          <Typography variant="h7">Show All</Typography>
        </Box>
      </Container>
      <FlashCards
        setCurrentCardId={setCurrentCardId}
        setIsEdit={setIsEdit}
        isAll={isAll}
        cards={filteredCard}
        loading={isLoading}
      />
    </Container>
  );
};

export default Home;
