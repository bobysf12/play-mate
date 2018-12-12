import { EventsState } from "./types";
import { EventAction, actions } from "./actions";
import { getType } from "typesafe-actions";

const initialState: EventsState = {
	events: {},
	isCreatingEvent: false,
};

export default function reducer(state: EventsState = initialState, action: EventAction): EventsState {
	switch (action.type) {
		case getType(actions.creatingEvent):
			return {
				...state,
				isCreatingEvent: true,
			};
		case getType(actions.eventCreated):
			return {
				...state,
				isCreatingEvent: false,
				events: {
					...state.events,
					[action.payload.id!]: action.payload,
				},
			};

		default:
			return state;
	}
}
