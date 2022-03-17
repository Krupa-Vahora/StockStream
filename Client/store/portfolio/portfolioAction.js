import axios from "axios";
const baseUrl = "http://127.0.0.1:3000";
export const GET_PORT_DATA = "GET_PORT_DATA";
export const SEND_PORT_DATA = "SEND_PORT_DATA";
export const DELETE_PORT_DATA = "DELETE_PORT_DATA";

export const getPort = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseUrl}/portfolio/allPortStock`);
      const resData = await response.data;

      dispatch({ type: GET_PORT_DATA, portfolio: resData });
    } catch (err) {
      throw err;
    }
  };
};

export const sendPort = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseUrl}/portfolio/new`, data);
      const resData = await response.data;

      return dispatch({ type: SEND_PORT_DATA, portfolio: resData });
    } catch (err) {
      throw err;
    }
  };
};

export const deletePort = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${baseUrl}/portfolio/delete/${id}`);
      const resData = await response.data;

      return dispatch({ type: DELETE_PORT_DATA, portfolio: resData });
    } catch (err) {
      throw err;
    }
  };
};
