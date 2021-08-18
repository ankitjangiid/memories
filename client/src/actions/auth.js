import {
  AUTH,
  INVALID_USER,
  INVALID_PASSWORD,
  USER_EXIST,
  PASSWORD_DOESNT_MATCH,
  SHOW_SNACKBAR,
  USER_EXIST_WITH_THAT_TOKEN,
  USER_DOESNT_EXIST_WITH_THAT_TOKEN,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    if (data?.message === "Invalid credentials") {
      dispatch({ type: INVALID_PASSWORD });
      router.push("/auth");
    } else if (data?.message === "Invalid user") {
      dispatch({ type: INVALID_USER });
      router.push("/auth");
    } else {
      dispatch({ type: AUTH, data });
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    if (data?.message === "User already exists") {
      dispatch({ type: USER_EXIST });
    } else if (data?.message === "Passwords doesn't match") {
      dispatch({ type: PASSWORD_DOESNT_MATCH });
    } else {
      dispatch({ type: AUTH, data });
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const forgot_password = (email) => async (dispatch) => {
  try {
    const { data } = await api.forgot_password(email);

    if (data?.message === "Invalid user") {
      dispatch({ type: INVALID_USER });
    } else {
      dispatch({ type: SHOW_SNACKBAR });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserByToken = (token) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getUserByToken(token);

    if (data?.message === "User exist") {
      dispatch({ type: USER_EXIST_WITH_THAT_TOKEN });
      dispatch({ type: END_LOADING });
    } else {
      dispatch({ type: USER_DOESNT_EXIST_WITH_THAT_TOKEN });
      dispatch({ type: END_LOADING });
    }
  } catch (error) {
    console.log(error);
  }
};

export const reset_password = (password, token) => async (dispatch) => {
  try {
    const { data } = await api.reset_password(password, token);

    if (data?.message === "Password reset successfully") {
      dispatch({ type: SHOW_SNACKBAR });
    }
  } catch (error) {
    console.log(error);
  }
};
