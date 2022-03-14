import axios from "axios";
const baseUrl = "http://127.0.0.1:3000";
export const GET_STOCK_DATA = "GET_STOCK_DATA";
export const GET_STOCK_PRICE = "GET_STOCK_PRICE";

export const getStock = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseUrl}/company/all`);
      const resData = await response.data;
      // console.log("actionStock", resData);
      dispatch({ type: GET_STOCK_DATA, stock: resData });
    } catch (err) {
      throw err;
    }
  };
};

export const getStockInfo = () => {
  return async (dispatch) => {
    try {
      const response1 = await axios.get(`${baseUrl}/stock/allStock`);
      const resData1 = await response1.data;
      // console.log("actionStockInfo", resData1[0].percentage);
      dispatch({ type: GET_STOCK_PRICE, stockInfo: resData1 });
    } catch (err) {
      throw err;
    }
  };
};
