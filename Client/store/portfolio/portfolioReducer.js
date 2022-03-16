import {
  GET_PORT_DATA,
  SEND_PORT_DATA,
  DELETE_PORT_DATA,
} from "./portfolioAction";

const initialstate = {
  getportfolio: [],
  sendportfolio: [],
  deleteportfolio: [],
};

const portfolioReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_PORT_DATA:
      return {
        getportfolio: action.portfolio,
      };
    case SEND_PORT_DATA:
      return {
        sendportfolio: action.portfolio,
      };
    case DELETE_PORT_DATA:
      return {
        deleteportfolio: action.portfolio,
      };
  }
  return state;
};

export default portfolioReducer;
