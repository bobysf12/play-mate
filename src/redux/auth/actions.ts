import { createAction, ActionType } from "typesafe-actions";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { history } from "src/App";
import api from "src/helpers/api";
import createLogger from "src/helpers/logger";

const logger = createLogger("authActions");

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

        api.login(username, password)
            .then((response: any) => {
                const userId: string = response.user.user_id;
                const token: string = response.session_id;

                dispatch(actions.loggedIn(userId, token));
                // Save token
                localStorage.setItem("token", token);

                history.push("/events");
            })
            .catch((err: any) => logger.error("Login failed", err));
    };
};

export const register = (username: string, password: string, name: string): ThunkAction<void, RootState, any, any> => {
    return (dispatch, getState) => {
        dispatch(actions.registering(username, password, name));

        api.register(username, password, name)
            .then((response: any) => {
                const userId: string = response.user_id;
                dispatch(actions.registered(userId));
                dispatch(login(username, password));
            })
            .catch((err: any) => logger.error("Register failed", err));
    };
};
