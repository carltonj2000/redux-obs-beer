import { throwError, of } from "rxjs";
import { switchMap, map, debounceTime, catchError } from "rxjs/operators";
//import { ignoreElements, tap } from "rxjs/operators"; // for debug
import { ajax } from "rxjs/ajax";
import { combineEpics } from "redux-observable";

import { SEARCH_BEERS, searchBeersDone, searchBeersErr } from "../actions";

const beers = `https://api.punkapi.com/v2/beers`;
const search = term => `${beers}?beer_name=${encodeURIComponent(term)}`;
const ajx = term =>
  term === "skull"
    ? throwError(new Error("Ajax failed"))
    : ajax.getJSON(search(term));

const fetchBeer = actions$ =>
  actions$.ofType(SEARCH_BEERS).pipe(
    debounceTime(500),
    switchMap(({ payload }) =>
      ajx(payload).pipe(
        map(searchBeersDone),
        catchError(err => of(searchBeersErr(err)))
      )
    )
  );

export const rootEpic = combineEpics(fetchBeer);
