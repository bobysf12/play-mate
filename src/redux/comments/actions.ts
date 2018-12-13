import { createAction, ActionType } from "typesafe-actions";
import { RootState } from "..";
import { ThunkAction } from "redux-thunk";
import { Comment } from "./types";

export const actions = {
	loadingComments: createAction("Comments/loadingComments", resolve => (eventId: string) => resolve({ eventId })),
	commentsLoaded: createAction("Comments/commentsLoaded", resolve => (eventId: string, comments: Comment[]) =>
		resolve({ eventId, comments }),
	),

	addingComment: createAction("Comments/addingComment", resolve => (eventId: string, comment: Comment) =>
		resolve({ eventId, comment }),
	),
	commentAdded: createAction("Comments/commentAdded", resolve => (eventId: string, comment: Comment) =>
		resolve({ eventId, comment }),
	),
};

export type CommentAction = ActionType<typeof actions>;

//
// THUNK ACTION
//

export const loadComments = (eventId: string): ThunkAction<void, RootState, any, any> => {
	return (dispatch, getState) => {
		dispatch(actions.loadingComments(eventId));
		setTimeout(() => {
			actions.commentsLoaded(eventId, []);
		}, 1000);
	};
};

export const addComment = (eventId: string, comment: Comment): ThunkAction<void, RootState, any, any> => {
	return (dispatch, getState) => {
		dispatch(actions.addingComment(eventId, comment));
		setTimeout(() => {
			const commentWithId: Comment = {
				...comment,
				id: Date.now().toString(),
			};
			dispatch(actions.commentAdded(eventId, commentWithId));
		}, 1000);
	};
};
