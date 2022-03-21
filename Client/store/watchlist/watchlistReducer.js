import {
  GET_WATCH_DATA,
  SEND_WATCH_DATA,
  DELETE_WATCH_DATA,
} from "./watchlistAction";

const initialstate = {
  getwatchlist: [],
  sendWatchlist: [],
  deleteWatchlist: [],
};

const watchlistReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_WATCH_DATA:
      return {
        getwatchlist: action.watchlist,
      };
    case SEND_WATCH_DATA:
      return {
        sendWatchlist: action.watchlist,
      };
    case DELETE_WATCH_DATA:
      return {
        deleteWatchlist: action.watchlist,
      };
  }
  return state;
};

export default watchlistReducer;
