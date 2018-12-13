import { EventsState } from "./types";
import { EventAction, actions } from "./actions";
import { getType } from "typesafe-actions";

const initialState: EventsState = {
	events: {},
	isCreatingEvent: false,
	haveFetch: {},
	box: {
		nlat: 0,
		slat: 0,
		elong: 0,
		wlong: 0,
	}
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

		case getType(actions.fetchDone):
			return {
				...state,
				haveFetch: {
					...state.haveFetch,
					[action.payload]: true,
				},
			};

		case getType(actions.changeBox): {
			const { nlat, slat, elong, wlong } = action.payload;
			console.log('next state', {
				...state,
				box: {
					nlat, slat, elong, wlong,
				}});
			return {
				...state,
				box: {
					nlat, slat, elong, wlong,
				}
			}
		}

		default:
			return state;
	}
}
