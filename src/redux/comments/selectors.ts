import { RootState } from "..";
import { Comment } from "./types";

const getCommentsState = (state: RootState) => state.comments;
const getCommentsStateByEventId = (eventId: string) => (state: RootState) => getCommentsState(state)[eventId];

export const getEventComments = (eventId: string) => (state: RootState) => {
	const commentsState = getCommentsStateByEventId(eventId)(state);
	if (!commentsState) {
		return [];
	}
	const commentsMap: Record<string, Comment> = commentsState.commentsMap;
	return Object.keys(commentsMap)
		.map(k => commentsMap[k])
		.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
};

export const isLoadingComments = (eventId: string) => (state: RootState) => {
	const commentsState = getCommentsStateByEventId(eventId)(state);
	if (!commentsState) {
		return false;
	}

	return commentsState.isLoadingComments;
};

export const isCreatingComment = (eventId: string) => (state: RootState) => {
	const commentsState = getCommentsStateByEventId(eventId)(state);
	if (!commentsState) {
		return false;
	}

	return commentsState.isCreatingComment;
};
