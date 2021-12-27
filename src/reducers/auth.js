import { AUTH, LOGOUT, LOADING, STOP_LOADING } from "../constants/actionTypes";

const auth = (state = { isLoading: null, authData: null} , action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, isLoading: true };
          case STOP_LOADING:
            return { ...state, isLoading: false };
        case AUTH:
            localStorage.setItem("userProfile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.removeItem("userProfile");
            return { ...state, authData: null };
        default:
            return state;
    } 
}

export default auth;