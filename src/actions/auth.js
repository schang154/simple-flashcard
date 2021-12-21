import { navigate } from "gatsby-link";
import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signIn = ( formData ) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data});

    navigate("/app/", { replace: true });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = ( formData ) => async (dispatch) => {

  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data});

    navigate("/app/", { replace: true });
  } catch (error) {
    console.log(error);
  }
};

