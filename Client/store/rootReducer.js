import { combineReducers } from "redux";
import tabReducer from "./tab/tabReducer";
import marketReducer from "./market/marketReducer";
import newsReducer from "./news/newsReducer";
import stockReducer from "./market/stockReducer";
import userReducer from "./user/userReducer";
import portfolioReducer from "./portfolio/portfolioReducer";

export default combineReducers({
  tabReducer,
  marketReducer,
  news: newsReducer,
  stock: stockReducer,
  user: userReducer,
  portfolio: portfolioReducer,
});
