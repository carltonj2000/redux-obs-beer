import { throwError, of, concat } from "rxjs";
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap
} from "rxjs/operators";
//import { ignoreElements, tap } from "rxjs/operators"; // for debug
import { ajax } from "rxjs/ajax";
import { combineEpics } from "redux-observable";

import {
  SEARCH_BEERS,
  searchBeersDone,
  searchBeersErr,
  searchBeersLoading
} from "../actions";

const beers = `https://api.punkapi.com/v2/beers`;
const search = term => `${beers}?beer_name=${encodeURIComponent(term)}`;
const ajx = term =>
  term === "skull"
    ? throwError(new Error("Ajax failed"))
    : ajax.getJSON(search(term));

const fetchBeer = actions$ =>
  actions$.ofType(SEARCH_BEERS).pipe(
    debounceTime(500),
    filter(({ payload }) => payload !== ""),
    switchMap(({ payload }) => {
      const loading = of(searchBeersLoading(true));
      const request = ajx(payload).pipe(
        map(searchBeersDone),
        catchError(err => of(searchBeersErr(err)))
      );
      return concat(loading, request);
    })
  );

export const rootEpic = combineEpics(fetchBeer);
