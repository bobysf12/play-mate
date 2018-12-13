import { Event } from "src/redux/events/types";
import moment from "moment";
import { CommentType } from "src/redux/comments/types";

function getUrl(endpoint: string) {
    return `http://api.socionomad.com${endpoint}`;
}

function getHeaders() {
    return {
        "Content-Type": "application/json",
        "X-SESSION-ID": localStorage.getItem("token") || "",
    };
}
function register(username: string, password: string, name: string) {
    return fetch(getUrl("/user/create"), {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
            name,
        }),
        headers: getHeaders(),
    }).then(res => res.json());
}

function login(username: string, password: string) {
    return fetch(getUrl("/user/login"), {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
        }),
        headers: getHeaders(),
    }).then(res => res.json());
}

function createEvent(event: Event) {
    return fetch(getUrl("/event/create"), {
        method: "POST",
        body: JSON.stringify({
            title: event.title,
            description: event.description,
            latitude: event.location.latitude,
            longitude: event.location.longitude,
            max_person: event.max_person,
            start_time: event.start_time.toISOString(),
            end_time: event.end_time.toISOString(),
        }),
        headers: getHeaders(),
    }).then(res => res.json());
}

function getEvents() {
    const startTime: string = moment()
        .startOf("month")
        .toISOString();
    const endTime: string = moment()
        .endOf("month")
        .toISOString();
    const latitude: number = -6.874466;
    const longitude: number = 107.590251;

    return fetch(
        `${getUrl(
            "/event/list",
        )}?start_time=${startTime}&end_time=${endTime}&longitude=${longitude}&latitude=${latitude}&distance=20000`,
        {
            method: "GET",
            headers: getHeaders(),
        },
    ).then(res => res.json());
}

function getComments(eventId: string) {
    return fetch(getUrl(`/event/${eventId}/comment/list`), {
        method: "GET",
        headers: getHeaders(),
    }).then(res => res.json());
}

function sendComment(eventId: string, comment: string) {
    return fetch(getUrl(`/event/${eventId}/comment/send`), {
        method: "POST",
        body: JSON.stringify({
            text: comment,
            type: CommentType.CHAT,
        }),
        headers: getHeaders(),
    }).then(res => res.json());
}

export default {
    register,
    login,
    createEvent,
    getEvents,
    getComments,
    sendComment,
};
