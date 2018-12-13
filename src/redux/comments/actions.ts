import { createAction, ActionType } from "typesafe-actions";
import { RootState } from "..";
import { ThunkAction } from "redux-thunk";
import { Comment } from "./types";
import api from "src/helpers/api";
import createLogger from "src/helpers/logger";

export const actions = {
    loadingComments: createAction("Comments/loadingComments", resolve => (eventId: string) => resolve({ eventId })),
    commentsLoaded: createAction("Comments/commentsLoaded", resolve => (eventId: string, comments: Comment[]) =>
        resolve({ eventId, comments }),
    ),

    addingComment: createAction("Comments/addingComment", resolve => (eventId: string, comment: string) =>
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

const logger = createLogger("commentsAction");
export const loadComments = (eventId: string): ThunkAction<void, RootState, any, any> => {
    return (dispatch, getState) => {
        dispatch(actions.loadingComments(eventId));
        api.getComments(eventId).then(res => {
            logger.debug(res);
            const newComments = res.data.map((comment: any) => {
                return {
                    ...comment,
                    created_at: new Date(comment.created_at),
                };
            });
            dispatch(actions.commentsLoaded(eventId, newComments));
        });
    };
};

export const addComment = (eventId: string, text: string): ThunkAction<void, RootState, any, any> => {
    return (dispatch, getState) => {
        dispatch(actions.addingComment(eventId, text));

        api.sendComment(eventId, text).then((res: any) => {
            const commentWithId: Comment = {
                ...res,
                created_at: new Date(res.created_at),
            };
            dispatch(actions.commentAdded(eventId, commentWithId));
        });
    };
};
