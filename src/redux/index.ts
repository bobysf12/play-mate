import { createStore, Reducer, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

export interface RootState {}

const reducers: Reducer<RootState> = combineReducers<RootState>({});
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
