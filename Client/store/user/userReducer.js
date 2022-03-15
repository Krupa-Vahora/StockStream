import { NEW_USER_DATA, LOGIN_USER_DATA, loginUser } from "./userAction";
const initialstate = {
  registerUser: [],
  loginUser: [],
};
const userReducer = (state = initialstate, action) => {
  switch (action.type) {
    case NEW_USER_DATA:
      return {
        ...state,
        registerUser: action.user,
      };
    case LOGIN_USER_DATA:
      return {
        ...state,
        loginUser: action.user,
      };
  }
  return state;
};
export default userReducer;
