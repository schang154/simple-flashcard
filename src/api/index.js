import axios from 'axios';

const API = axios.create({ baseURL: "https://simple-flashcard-app.herokuapp.com/api/v1" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userProfile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("userProfile")).token}`
  }
  return req;
});

const card = `/cards`;
const user = `/users`;

export const fetchCards = () => API.get(card);
export const getCardCount = () => API.get(`${card}/cardCount`);
export const createCard = (newCard) => API.post(card, newCard);
export const updateCard = (id, updatedCard) => API.patch(`${card}/${id}`, updatedCard);
export const deleteCard = (id) => API.delete(`${card}/${id}`);
export const favoriteCard = (id) => API.patch(`${card}/${id}/favoriteCard`);

export const signIn = (formData) => API.post(`${user}/signIn`, formData);
export const signUp = (formData) => API.post(`${user}/signUp`, formData);
