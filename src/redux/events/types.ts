import { User } from "../auth/types";

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
    status?: EventStatus;
    creator_id?: string;
}

export enum EventStatus {
    OPEN = "open",
    CLOSED = "closed",
    EXPIRED = "expired",
}

export interface EventsState {
    events: Record<string, Event>;
    isCreatingEvent: boolean;
    haveFetch: {
        [name: string]: boolean;
    };
    box: {
        nlat: number;
        slat: number;
        elong: number;
        wlong: number;
    };
}
