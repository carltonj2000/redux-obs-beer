import { SEARCH_BEERS, SEARCH_BEERS_DONE, SEARCH_BEERS_ERR } from "../actions";

const initialState = {
  beers: [],
  loading: false,
  messages: []
};

const beerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_BEERS:
      return { ...state, loading: true, messages: [] };
    case SEARCH_BEERS_DONE:
      return { ...state, beers: action.payload, loading: false };
    case SEARCH_BEERS_ERR:
      return {
        ...state,
        loading: false,
        messages: [{ type: "error", text: action.payload }]
      };
    default:
      return state;
  }
};

export default beerReducer;
