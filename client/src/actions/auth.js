import {
  AUTH,
  INVALID_USER,
  INVALID_PASSWORD,
  USER_EXIST,
  PASSWORD_DOESNT_MATCH,
} from "../constants/actionTypes";
// here '*' means we import everything from api as 'api'
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    // login user ..
    const { data } = await api.signIn(formData);

    // Here we're just checking that if user enterd wrong credentials or not
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
    // signup user ..
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

/*
Let's discuss how i come up with idea to use invalid user and pass

-> first i check in this file that we're making a API call SignIn.
-> Now we go to that file which will be in server/controller ->user
-> there in signin function (because we called signin fun in api) we see that first we're getting confirmation from mongoDB
  then we respond with an result
-> there i see when something wrong happen like password doesn't match we call res.status(400).json... here i remove .status because it was causing .json to not run
  so it was sending nothing but only an error of 400
-> then in change it to send a message called "Invalid credential" or anything else
-> then we come back to this file and we check if message if equal to something if so then we dispatch an action according to it with different name (like: INVALID_USER etc)
-> after dispatching action we go to file reducer->auth ther we see an action called INVALID_USER which return an variable invalidUser: true and that variable is now stored globally
-> Now in Auth form file we access that variable by using useSelector

*/
