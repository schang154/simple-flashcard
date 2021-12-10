import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCards } from "../../actions/cards";
import FlashCards from "../FlashCards/FlashCards";
import Form from "../Form/Form";

const Home = () => {
  const [currentCardId, setCurrentCardId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCards());
  }, [currentCardId, dispatch]);

  return (
    <main>
        <h1>Welcome to Flash Cards!</h1>
        <Form currentCardId={currentCardId} setCurrentCardId={setCurrentCardId}/>
        <FlashCards setCurrentCardId={setCurrentCardId}/>
    </main>
  );
};

export default Home;
