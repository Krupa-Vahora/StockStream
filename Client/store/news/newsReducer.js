import { GET_NEWS_DATA } from "./newsAction";

const initialstate = {
  news: [],
};

const newsReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_NEWS_DATA:
      return {
        news: action.news,
      };
  }
  return state;
};

export default newsReducer;
