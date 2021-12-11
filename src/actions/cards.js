import * as api from "../api";
import { CREATE, FETCH_ALL, UPDATE, DELETE } from "../constants/actionTypes";

export const getCards = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCards();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCard = (card) => async (dispatch) => {
  try {
    const { data } = await api.createCard(card);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCard = (id, card) => async (dispatch) => {
  try {
    const { data } = await api.updateCard(id, card);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCard = (id) => async (dispatch) => {
  try {
    await api.deleteCard(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const favoriteCard = (id) => async (dispatch) => {
  try {
    const { data } = await api.favoriteCard(id);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
