import { CommentsState, Comment } from "./types";
import { CommentAction, actions } from "./actions";
import { getType } from "typesafe-actions";

const initialState: CommentsState = {};

export default function reducer(state: CommentsState = initialState, action: CommentAction): CommentsState {
	switch (action.type) {
		case getType(actions.addingComment): {
			const { eventId } = action.payload;
			return {
				...state,
				[eventId]: {
					...state[eventId],
					isCreatingComment: true,
				},
			};
		}

		case getType(actions.commentAdded): {
			const { comment, eventId } = action.payload;
			return {
				...state,
				[eventId]: {
					...state[eventId],
					isCreatingComment: false,
					commentsMap: {
						...state[eventId].commentsMap,
						[comment.id!]: comment,
					},
				},
			};
		}

		case getType(actions.loadingComments): {
			const { eventId } = action.payload;
			return {
				...state,
				[eventId]: {
					...state[eventId],
					isLoadingComments: true,
				},
			};
		}

		case getType(actions.commentsLoaded): {
			const { comments, eventId } = action.payload;

			const newCommentsMap: Record<string, Comment> = comments.reduce((newComments, comment) => {
				return {
					...newComments,
					[comment.id!]: comment,
				};
			}, state[eventId].commentsMap);

			return {
				...state,
				[eventId]: {
					...state[eventId],
					isLoadingComments: false,
					commentsMap: newCommentsMap,
				},
			};
		}
		default:
			return state;
	}
}
