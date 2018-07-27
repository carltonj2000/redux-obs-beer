import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { ajax } from "rxjs/ajax";

import reducer from "./reducers";
import { rootEpic } from "./epics";

export const configureStore = (deps = {}) => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: { ajax, ...deps }
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);
  return store;
};
