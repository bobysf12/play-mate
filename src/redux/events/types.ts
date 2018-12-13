/**
 * TODO: Temporary User interface. Should be moved to user folder
 */
interface User {
	name: string;
	username: string;
	id: string;
}

export interface EventLocation {
	longitude: number;
	latitude: number;
	detail?: string;
}

export interface Event {
	id?: string;
	title: string;
	description: string;
	start_time: Date;
	end_time: Date;
	location: EventLocation;
	max_person: number;
	participants?: User[];
	status: EventStatus;
	creator_id: number;
}

export enum EventStatus {
	OPEN = "open",
	CLOSED = "closed",
	EXPIRED = "expired",
}

export interface EventsState {
	events: Record<string, Event>;
	isCreatingEvent: boolean;
}
