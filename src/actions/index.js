export const SEARCH_BEERS = "SEARCH_BEERS";
export const SEARCH_BEERS_DONE = "SEARCH_BEERS_DONE";
export const SEARCH_BEERS_ERR = "SEARCH_BEERS_ERR";
export const SEARCH_BEERS_LOADING = "SEARCH_BEERS_LOADING";
export const SEARCH_BEERS_CANCEL = "SEARCH_BEERS_CANCEL";

export const searchBeersCancel = () => ({
  type: SEARCH_BEERS_CANCEL
});

export const searchBeersLoading = loading => ({
  type: SEARCH_BEERS_LOADING,
  payload: loading
});

export const searchBeers = beer => ({
  type: SEARCH_BEERS,
  payload: beer
});

export const searchBeersDone = beers => ({
  type: SEARCH_BEERS_DONE,
  payload: beers
});

export const searchBeersErr = err => ({
  type: SEARCH_BEERS_ERR,
  payload: err.message
});
