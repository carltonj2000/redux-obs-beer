import {
  concat,
  merge,
  of
  // throwError // uncommment when test error throwing and catching
} from "rxjs";
import {
  catchError,
  debounceTime,
  //  delay, // uncomment to test ajax cancelation
  filter,
  map,
  switchMap,
  takeUntil
} from "rxjs/operators";
//import { ignoreElements, tap } from "rxjs/operators"; // for debug
import { ajax } from "rxjs/ajax";
import { combineEpics } from "redux-observable";

import {
  SEARCH_BEERS,
  SEARCH_BEERS_CANCEL,
  searchBeersDone,
  searchBeersErr,
  searchBeersLoading
} from "../actions";

const beers = `https://api.punkapi.com/v2/beers`;
const search = term => `${beers}?beer_name=${encodeURIComponent(term)}`;
// uncomment to test trowing and catching errors
/*
const ajx = term =>
  term === "skull"
    ? throwError(new Error("Ajax failed"))
    : ajax.getJSON(search(term));
*/
export const fetchBeer = (actions$, store, deps) =>
  actions$.ofType(SEARCH_BEERS).pipe(
    debounceTime(500, deps.scheduler),
    filter(({ payload }) => payload !== ""),
    switchMap(({ payload }) => {
      const loading = of(searchBeersLoading(true));
      const blockers = merge(actions$.ofType(SEARCH_BEERS_CANCEL));
      const request = deps.ajax.getJSON(search(payload)).pipe(
        //delay(2000), // used during debug to test cancel ajax options
        takeUntil(blockers),
        map(searchBeersDone),
        catchError(err => of(searchBeersErr(err)))
      );
      return concat(loading, request);
    })
  );

export const rootEpic = combineEpics(fetchBeer);
