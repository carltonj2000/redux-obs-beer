import { of, VirtualTimeScheduler } from "rxjs";
import { ActionsObservable } from "redux-observable";

import { fetchBeer } from "./index";
import { searchBeers } from "../actions";
import { configureStore } from "../configureStore";

const scheduler = new VirtualTimeScheduler();
const deps = {
  scheduler,
  ajax: { getJSON: () => of([{ name: "shane" }]) }
};

it("should perform a search", () => {
  const action$ = ActionsObservable.of(searchBeers("shane"));
  const output$ = fetchBeer(action$, null, deps);
  output$.subscribe(action => {
    console.log(action);
  });
});

it("test store", () => {
  const action = searchBeers("shane");
  const store = configureStore(deps);
  store.dispatch(action);
  scheduler.flush();
  const state = store.getState();
  console.log(state);
  expect(state.beers.length).toBe(1);
});
