import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
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

    case actionType.FIELD_RESET:
      return {
        ...state,
        invalidUser: false,
        invalidPassword: false,
        userExist: false,
        passwordDoesntMatch: false,
        showSnackbar: false,
      };

    case actionType.SHOW_SNACKBAR:
      return { ...state, showSnackbar: true };

    case actionType.USER_EXIST_WITH_THAT_TOKEN:
      return { ...state, userExistWithThatToken: true };

    case actionType.USER_DOESNT_EXIST_WITH_THAT_TOKEN:
      return { ...state, userExistWithThatToken: false };

    default:
      return state;
  }
};

export default authReducer;
