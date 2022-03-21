import axios from "axios";
const baseUrl = "http://127.0.0.1:3000";
export const GET_WATCH_DATA = "GET_WATCH_DATA";
export const SEND_WATCH_DATA = "SEND_WATCH_DATA ";
export const DELETE_WATCH_DATA = "DELETE_WATCH_DATA";

export const getWatch = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseUrl}/watchlist/allWatchStock`);
      const resData = await response.data;
      //   console.log("watchlist Response", resData);

      dispatch({ type: GET_WATCH_DATA, watchlist: resData });
    } catch (err) {
      throw err;
    }
  };
};

export const sendWatch = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseUrl}/watchlist/new`, data);
      const resData = await response.data;
      return dispatch({ type: SEND_WATCH_DATA, watchlist: resData });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteWatch = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${baseUrl}/watchlist/delete/${id}`);
      const resData = await response.data;

      return dispatch({ type: DELETE_WATCH_DATA, watchlist: resData });
    } catch (err) {
      throw err;
    }
  };
};
