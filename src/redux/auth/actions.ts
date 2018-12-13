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
			history.push("/events");
		}, 1000);
	};
};
