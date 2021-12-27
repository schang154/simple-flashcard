import { CREATE, FETCH_ALL, UPDATE, DELETE, LOADING, STOP_LOADING } from "../constants/actionTypes";

const state = (state = { isLoading: true, cards: [] }, action) => {
  switch (action.type) {
    case CREATE:
      return {...state, cards: [...state.cards, action.payload] };
    case FETCH_ALL:
      return { ...state, cards: action.payload };
    case UPDATE:
      return { ...state, cards: state.cards.map((card) => 
        card._id === action.payload._id ? action.payload : card
      )};
    case DELETE:
      return { ...state, cards: state.cards.filter((card) => card._id !== action.payload)};
    case LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default state;
