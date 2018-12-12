import { createAction, ActionType } from "typesafe-actions";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { Event } from "./types";

export const actions = {
	creatingEvent: createAction("Events/creatingEvent", resolve => (event: Event) => resolve(event)),
	eventCreated: createAction("Events/eventCreated", resolve => (event: Event) => resolve(event)),
};

export type EventAction = ActionType<typeof actions>;

//
// THUNK ACTIONS
//

export const createEvent = (event: Event): ThunkAction<void, RootState, any, any> => {
	return (dispatch, getState) => {
		dispatch(actions.creatingEvent(event));

		setTimeout(() => {
			const eventWithId: Event = {
				...event,
				id: Date.now().toString(),
			};
			dispatch(actions.eventCreated(eventWithId));
		}, 1000);
	};
};
