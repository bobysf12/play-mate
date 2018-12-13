import { AuthState } from "./types";
import { AuthAction, actions } from "./actions";
import { getType } from "typesafe-actions";

const initialState: AuthState = {
	isLoggingIn: false,
	isRegistering: false,
	loggedInUserId: undefined,
	token: undefined,
};

export default function reducer(state: AuthState = initialState, action: AuthAction): AuthState {
	switch (action.type) {
		case getType(actions.loggingIn):
			return {
				...state,
				isLoggingIn: true,
			};

		case getType(actions.loggedIn):
			return {
				...state,
				isLoggingIn: false,
				loggedInUserId: action.payload.userId,
				token: action.payload.token,
			};

		case getType(actions.loginFail):
			return {
				...state,
				isLoggingIn: false,
			};

		case getType(actions.registering):
			return {
				...state,
				isRegistering: true,
			};
		case getType(actions.registered):
			return {
				...state,
				isRegistering: false,
			};
		default:
			return state;
	}
}
