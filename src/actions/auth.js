import { navigate } from "gatsby-link";
import * as api from "../api";
import { AUTH, LOADING, STOP_LOADING } from "../constants/actionTypes";

export const signIn = ( formData ) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data});
    dispatch({ type: STOP_LOADING });
    navigate("/app/", { replace: true });
  } catch (error) {
    console.log(error);
    alert("User doesn't exist.")
    window.location.reload();
  }
};

export const signUp = ( formData ) => async (dispatch) => {

  try {
    dispatch({ type: LOADING });
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data});
    dispatch({ type: STOP_LOADING });
    navigate("/app/", { replace: true });
  } catch (error) {
    console.log(error);
  }
};

