import { createStore, Reducer, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import authReducer from "./auth/reducer";
import commentsReducer from "./comments/reducer";
import eventsReducer from "./events/reducer";

export interface RootState {
	auth: ReturnType<typeof authReducer>;
	events: ReturnType<typeof eventsReducer>;
	comments: ReturnType<typeof commentsReducer>;
}

const reducers: Reducer<RootState> = combineReducers<RootState>({
	auth: authReducer,
	events: eventsReducer,
	comments: commentsReducer,
});
let middleware = null;

// Enable Redux Tools support only in Developer's build.
// enable the Redux Tools in Chrome
// @ts-ignore
const REDUX_TOOLS: any = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

if (REDUX_TOOLS) {
	middleware = compose(
		applyMiddleware(...[thunk]),
		...[REDUX_TOOLS],
	);
} else {
	middleware = compose(applyMiddleware(...[thunk]));
}

export default createStore(reducers, middleware);
