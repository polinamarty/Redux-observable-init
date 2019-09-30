import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { defaultStore, rootReducer } from './reducer';
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { getData, getDataWithError } from './utils';

import { epics } from "./epics";

const epicMiddleware = createEpicMiddleware({
    dependencies: {
        getData,
        getDataWithError
    }
});

export const store = createStore(
    rootReducer,
    defaultStore,
    composeWithDevTools(
        applyMiddleware(epicMiddleware),
    )
);

epicMiddleware.run(combineEpics(...epics));
