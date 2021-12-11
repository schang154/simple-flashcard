import { CREATE, FETCH_ALL, UPDATE, DELETE } from "../constants/actionTypes";

const cards = (cards = [], action) => {
    switch (action.type) {
        case CREATE:
            return [...cards, action.payload];
        case FETCH_ALL:
            return action.payload;
        case UPDATE:
            return cards.map((card) => card._id === action.payload._id ? action.payload : card);
        case DELETE:
            return cards.filter((card) => card._id !== action.payload);
        default:
            return cards;
    } 
}

export default cards;