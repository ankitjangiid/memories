import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      // To store the data in localstorage so that browser can know we're still logged in
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };

    case actionType.INVALID_USER:
      return { ...state, invalidUser: true };

    case actionType.INVALID_PASSWORD:
      return { ...state, invalidPassword: true };

    case actionType.USER_EXIST:
      return { ...state, userExist: true };

    case actionType.PASSWORD_DOESNT_MATCH:
      return { ...state, passwordDoesntMatch: true };

    default:
      return state;
  }
};

export default authReducer;
