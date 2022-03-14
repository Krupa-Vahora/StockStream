import axios from "axios";
const baseUrl = "http://127.0.0.1:3000";
export const GET_NEWS_DATA = "GET_NEWS_DATA";

export const getNews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseUrl}/news/allNews`);
      const resData = await response.data;

      dispatch({ type: GET_NEWS_DATA, news: resData });
    } catch (err) {
      throw err;
    }
  };
};
