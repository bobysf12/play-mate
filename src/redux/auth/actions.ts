import { createAction, ActionType } from "typesafe-actions";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { history } from "src/App";

export const actions = {
	loggingIn: createAction("Auth/loggingIn", resolve => (username: string, password: string) =>
		resolve({ username, password }),
	),
	loggedIn: createAction("Auth/loggedIn", resolve => (userId: string, token: string) => resolve({ userId, token })),
	loginFail: createAction("Auth/loginFail", resolve => (err: any) => resolve({ err })),

	registering: createAction("Auth/registering", resolve => (username: string, password: string, name: string) =>
		resolve({ username, password, name }),
	),
	registered: createAction("Auth/registered", resolve => userId => resolve({ userId })),
};

export type AuthAction = ActionType<typeof actions>;

export const login = (username: string, password: string): ThunkAction<void, RootState, any, any> => {
	return (dispatch, getState) => {
		dispatch(actions.loggingIn(username, password));

		setTimeout(() => {
			// TODO: Use API
			const userId: string = Date.now().toString();
			const token: string = Date.now().toString();
			dispatch(actions.loggedIn(userId, token));
			// Save token
			localStorage.setItem("token", token);

			history.push("/events");
		}, 1000);
	};
};

export const register = (username: string, password: string, name: string): ThunkAction<void, RootState, any, any> => {
	return (dispatch, getState) => {
		dispatch(actions.registering(username, password, name));

		setTimeout(() => {
			// TODO: Use API
			const userId: string = Date.now().toString();
			dispatch(actions.registered(userId));
			dispatch(login(username, password));
		}, 1000);
	};
};
