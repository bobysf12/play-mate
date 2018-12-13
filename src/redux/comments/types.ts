export interface Comment {
	id?: string;
	text: string;
	type: CommentType;
	created_at: Date;
	user_id: string;
}

interface CommentState {
	/**
	 * Comments mapped by comment id
	 */
	commentsMap: Record<string, Comment>;
	isCreatingComment: boolean;
	isLoadingComments: boolean;
}

export type CommentsState = Record<string, CommentState>;

export enum CommentType {
	CHAT = "chat",
	LOG = "log",
}
