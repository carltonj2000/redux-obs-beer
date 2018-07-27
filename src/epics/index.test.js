import { of } from "rxjs";
import { ActionsObservable } from "redux-observable";

import { fetchBeer } from "./index";
import { searchBeers } from "../actions";

it("should perform a search", () => {
  const deps = {
    ajax: { getJSON: () => of([{ name: "shane" }]) }
  };
  const action$ = ActionsObservable.of(searchBeers("shane"));
  const output$ = fetchBeer(action$, null, deps);
  output$.subscribe(action => {
    console.log(action);
  });
});
