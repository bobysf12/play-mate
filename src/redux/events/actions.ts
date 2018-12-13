import * as lodash from 'lodash';
import { createAction, ActionType } from "typesafe-actions";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { Event } from "./types";
import { history } from "src/App";

export const actions = {
	creatingEvent: createAction("Events/creatingEvent", resolve => (event: Event) => resolve(event)),
	eventCreated: createAction("Events/eventCreated", resolve => (event: Event) => resolve(event)),
	fetchDone: createAction("Events/fetchDone", resolve => (name: string) => resolve(name)),
	changeBox: createAction("Events/changeBox", resolve => (nlat: number,
		slat: number, elong: number, wlong: number) => resolve({nlat, slat, elong, wlong})),
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
			history.push("/events/" + eventWithId.id!);
		}, 1000);
	};
};

function toHash(d: Date) {
	return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
}

function setRandomTime(d: Date) {
	d.setHours(Math.floor(24 * Math.random()));
	d.setMinutes(Math.floor(60 * Math.random()));
	return d;
}

function getRandomLoc(box: any) {
	return {
		latitude: Math.random() * 3 * (box.nlat - box.slat) + 2 * box.slat - box.nlat,
		longitude: Math.random() * 3 * (box.wlong - box.elong) + 2 * box.elong - box.wlong,
	}
}

function createMockEvent(d: Date, box: any): Event {
	const start = setRandomTime(d);
	const end = new Date(start);
	end.setMinutes(end.getMinutes() + Math.floor(120 * Math.random()));

	const loc = getRandomLoc(box);

	return {
		id: toHash(d) + (new Date()).getTime().toString(),
		title: 'Let\'s play football',
		description: 'Looking for a group of football player',
		start_time: start,
		end_time: start,
		location: loc,
		max_person: 8,
		participants: [],
	}
}

export const fetchEvent = (d: Date): ThunkAction<void, RootState, any, any> => {
	return (dispatch, getState) => {
		const state = getState();

		if(state.events.haveFetch[toHash(d)]) {
			return;
		}

		const box = state.events.box;
		lodash.range(Math.floor(Math.random() * 15)).forEach(x => {
			dispatch(actions.eventCreated(createMockEvent(d, box)));
		});

		dispatch(actions.fetchDone(toHash(d)));
	};
};
