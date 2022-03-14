import { GET_STOCK_DATA, GET_STOCK_PRICE } from "./stockAction";

const initialstate = {
  stock: [],
  stockInfo: [],
};

const stockReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_STOCK_DATA:
      return {
        ...state,
        stocks: action.stock,
      };
    case GET_STOCK_PRICE:
      return {
        ...state,
        stockInfo: action.stockInfo,
      };
  }
  return state;
};

export default stockReducer;
