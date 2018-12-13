import { createAction, ActionType } from "typesafe-actions";
import { RootState } from "..";
import { ThunkAction } from "redux-thunk";
import { Comment, CommentType } from "./types";

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

export const addComment = (eventId: string, text: string): ThunkAction<void, RootState, any, any> => {
	return (dispatch, getState) => {
		// FIXME: Add user auth state
		const userId: string = "123";

		const commentData: Comment = {
			user_id: userId,
			created_at: new Date(),
			text,
			type: CommentType.CHAT,
		};

		dispatch(actions.addingComment(eventId, commentData));
		setTimeout(() => {
			const commentWithId: Comment = {
				...commentData,
				id: Date.now().toString(),
			};
			dispatch(actions.commentAdded(eventId, commentWithId));
		}, 1000);
	};
};
