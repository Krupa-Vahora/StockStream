import axios from "axios";

const baseUrl = "http://127.0.0.1:3000";

export const NEW_USER_DATA = "NEW_USER_DATA";
export const LOGIN_USER_DATA = "LOGIN_USER_DATA";

export const registerUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseUrl}/user/register`, data);
      dispatch({ type: NEW_USER_DATA, user: response.data.user });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      console.log("loginData:", data);
      const response = await axios.post(`${baseUrl}/user/login`, data);
      dispatch({ type: LOGIN_USER_DATA, user: response.data.user });
      return response;
    } catch (error) {
      throw error;
    }
  };
};
